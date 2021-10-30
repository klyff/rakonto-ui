import React, { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { QueueItem } from './index'
import Component from './Component'
import { ApiContext } from '../../lib/api'
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
  anchor: HTMLElement | null
  isProcessing: boolean
}>({
  // @ts-ignore
  actions: {},
  store: [],
  anchor: null,
  isProcessing: false
})

export const QueueProcessorProvider: React.FC = ({ children }) => {
  const [store, setStore] = useState<Partial<QueueItem>[]>([])
  const { api } = useContext(ApiContext)
  const { store: processorList } = useContext(SocketConnectorContext)
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)

  const open = (target: HTMLElement) => {
    setAnchorEl(target)
  }

  const close = () => {
    setAnchorEl(null)
  }

  const remove = useCallback(
    (id: string) => {
      setStore(store.filter(item => item.id !== id))
    },
    [store]
  )

  const upload = useCallback(
    async (
      upload: Partial<QueueItem> & NonNullable<{ id: string; file: File; title: string; description: string }>
    ) => {
      try {
        const story = await api().createStory(
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
                    type: progress < 100 ? 'UPLOADING' : 'UPLOADED'
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
                progress: 0,
                type: 'START FOR PROCESSING'
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
                type: 'ERROR',
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
      if (item.type === 'UPLOAD') {
        upload({
          id: item.id,
          file: item.file as File,
          title: item.title as string,
          description: item.description as string
        })
      }
      await Promise.resolve()
    },
    [upload, store, setStore]
  )

  useEffect(() => {
    Object.values(processorList).forEach(object => {
      const processingItem: QueueItem = {
        id: object.payload.id,
        title: object.payload.title,
        finished: object.finished,
        progress: object.progress,
        type: object.finished ? 'FINISHED' : 'PROCESSING'
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
    const isUploading = store.some(item => item.type === 'UPLOADING' || item.type === 'UPLOADED')
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
        anchor: anchorEl,
        isProcessing: store.some(item => !item.finished)
      }}
    >
      <Component />
      {children}
    </QueueProcessorContext.Provider>
  )
}
