import React, { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { QueueItem } from './index'
import Component from './Component'
import api from '../../lib/api'
import { SocketConnectorContext } from '../SocketConnector'
import { SimpleSnackbarContext } from '../SimpleSnackbar'

// @ts-ignore
export const QueueProcessorContext = createContext<{
  actions: {
    addProcessor: (item: Partial<QueueItem> & NonNullable<{ id: string; title: string }>) => Promise<void>
    open: (target: HTMLElement) => void
    close: () => void
    remove: (id: string) => void
  }
  store: Partial<QueueItem>[]
  isProcessing: boolean
}>({
  // @ts-ignore
  actions: {},
  store: [],
  isProcessing: false
})

export const QueueProcessorProvider: React.FC = ({ children }) => {
  const { actions: snackBarActions } = useContext(SimpleSnackbarContext)
  const [store, setStore] = useState<Partial<QueueItem>[]>([])
  const [show, setShow] = useState<boolean>(false)

  const { client: socketClient, connected } = useContext(SocketConnectorContext)

  const open = (target: HTMLElement) => {
    setShow(true)
  }

  const close = () => {
    setShow(false)
  }

  const replace = useCallback(
    async (upload: Partial<QueueItem> & NonNullable<{ id: string; file: File }>) => {
      try {
        const story = await api.changeStoryMedia(upload.id, upload.file, event => {
          const progress = Math.round((event.loaded * 100) / event.total)
          // @ts-ignore
          setStore(value => {
            return value.map(item => {
              if (item.id === upload.id) {
                return {
                  ...item,
                  progress,
                  step: progress < 100 ? 'UPLOADING' : 'UPLOADED'
                }
              }
              return {
                ...item
              }
            })
          })
        })
        setStore(value => {
          return value.map(item => {
            if (item.id === upload.id) {
              return {
                ...item,
                id: story.id,
                progress: undefined,
                step: 'START THE CONVERSION PROCESS'
              }
            }
            return {
              ...item
            }
          })
        })
      } catch (e) {
        setStore(value => {
          return value.map(item => {
            if (item.id === upload.id) {
              return {
                ...item,
                progress: 0,
                step: 'ERROR',
                finished: true
              }
            }
            return {
              ...item
            }
          })
        })
      }
    },
    [store, setStore]
  )

  const upload = useCallback(
    async (
      upload: Partial<QueueItem> & NonNullable<{ id: string; file: File; title: string; description: string }>
    ) => {
      try {
        const story = await api.createStory(
          upload.file,
          {
            title: upload.title,
            description: upload.description
          },
          event => {
            const progress = Math.round((event.loaded * 100) / event.total)
            // @ts-ignore
            setStore(value => {
              return value.map(item => {
                if (item.id === upload.id) {
                  return {
                    ...item,
                    progress,
                    step: progress < 100 ? 'UPLOADING' : 'UPLOADED'
                  }
                }
                return {
                  ...item
                }
              })
            })
          }
        )
        setStore(value => {
          return value.map(item => {
            if (item.id === upload.id) {
              return {
                ...item,
                id: story.id,
                progress: undefined,
                step: 'START THE CONVERSION PROCESS'
              }
            }
            return {
              ...item
            }
          })
        })
      } catch (error) {
        // @ts-ignore
        const { data } = error
        if (data.code === '1024') {
          snackBarActions.open('User Storage quota exceeded.')
        }
        setStore(value => {
          return value.map(item => {
            if (item.id === upload.id) {
              return {
                ...item,
                progress: 0,
                step: 'ERROR',
                finished: true
              }
            }
            return {
              ...item
            }
          })
        })
      }
    },
    [store, setStore]
  )

  const remove = useCallback(
    (id: string) => {
      setStore(store.filter(item => item.id !== id))
    },
    [store]
  )

  const addProcessor = useCallback(
    async (item: Partial<QueueItem> & NonNullable<{ id: string }>) => {
      // @ts-ignore
      setStore([...store, item])
      setShow(true)
      if (item.step === 'UPLOAD') {
        if (item.action === 'NEW') {
          upload({
            id: item.id,
            file: item.file as File,
            title: item.title as string,
            description: item.description as string
          })
        }

        if (item.action === 'REPLACE') {
          replace({
            id: item.id,
            file: item.file as File,
            title: item.title as string
          })
        }
      }

      await Promise.resolve()
    },
    [upload, store, setStore]
  )

  useEffect(() => {
    connected &&
      socketClient.subscribe('/user/queue/story-media-progress', (message: { body: string }) => {
        const { payload: data } = JSON.parse(message.body)

        const item: QueueItem = {
          id: data.id,
          title: data.title,
          finished: data.ready,
          progress: undefined,
          step: data.ready ? 'FINISHED' : 'PROCESSING'
        }

        setStore([item, ...store])
      })
  }, [socketClient, connected, setStore, setShow])

  useEffect(() => {
    setShow(store.length > 0)
  }, [store, setShow])

  useEffect(() => {
    const isUploading = store.some(item => item.step === 'UPLOADING' || item.step === 'UPLOADED')
    if (isUploading) {
      window.onbeforeunload = () => 'Are you sure you want to leave?'
    } else {
      window.onbeforeunload = null
    }
  }, [store])

  return (
    <QueueProcessorContext.Provider
      value={{
        actions: { addProcessor, open, close, remove },
        store,
        isProcessing: store.some(item => !item.finished)
      }}
    >
      {show && <Component />}
      {children}
    </QueueProcessorContext.Provider>
  )
}
