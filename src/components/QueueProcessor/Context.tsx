import React, { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { QueueItem } from './index'
import Component from './Component'
import api from '../../lib/api'
import { SocketConnectorContext } from '../SocketConnector'

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
  const [store, setStore] = useState<Partial<QueueItem>[]>([])
  const [show, setShow] = useState<boolean>(false)

  const { store: processorList } = useContext(SocketConnectorContext)

  const open = (target: HTMLElement) => {
    setShow(true)
  }

  const close = () => {
    setShow(false)
  }

  const remove = useCallback(
    (id: string) => {
      setStore(store.filter(item => item.id !== id))
    },
    [store]
  )

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
    Object.values(processorList).forEach(object => {
      const processingItem: QueueItem = {
        id: object.id,
        title: object.title,
        finished: object.ready,
        progress: undefined,
        step: object.ready ? 'FINISHED' : 'PROCESSING'
      }
      if (!store.some(item => item.id === processingItem.id)) {
        setStore([...store, processingItem])
        return
      }
      setStore(value => {
        return value.map<Partial<QueueItem>>(item => {
          if (item.id === processingItem.id) {
            return {
              ...item,
              ...processingItem
            }
          }
          return {
            ...item
          }
        })
      })
    })
  }, [processorList])

  useEffect(() => {
    const isUploading = store.some(item => item.step === 'UPLOADING' || item.step === 'UPLOADED')
    if (isUploading) {
      window.onbeforeunload = () => 'Are you sure you want to leave?'
    } else {
      window.onbeforeunload = null
    }
  }, [store])

  useEffect(() => {
    const init = async () => {
      const stories = await api.getProcessingStories()
      if (stories.length) {
        console.log(stories)
        setStore(() =>
          stories.map<QueueItem>(item => ({
            id: item.id,
            title: item.title,
            progress: undefined,
            step: 'PROCESSING',
            finished: false
          }))
        )
        setShow(true)
      }
    }
    init()
  }, [])

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
