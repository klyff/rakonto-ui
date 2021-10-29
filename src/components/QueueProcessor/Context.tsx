import React, { useState, createContext, useEffect, useContext } from 'react'
import { iQueueProcessor, QueueItem } from './index'
import Component from './Component'
import { ApiContext } from '../../lib/api'

// @ts-ignore
export const QueueProcessorContext = createContext<{
  actions: {
    addProcessor: (
      item: Partial<QueueItem> & NonNullable<{ id: string; file: File; title: string; description: string }>
    ) => void
  }
  store: Partial<iQueueProcessor>
}>({
  // @ts-ignore
  actions: {},
  store: {}
})

export const QueueProcessorProvider: React.FC = ({ children }) => {
  const [store, setStore] = useState<iQueueProcessor>({})
  const { api } = useContext(ApiContext)

  const upload = async (
    item: Partial<QueueItem> & NonNullable<{ id: string; file: File; title: string; description: string }>
  ) => {
    await api().createStory(
      item.file,
      {
        title: item.title,
        description: item.description
      },
      event => {
        const progress = Math.round((event.loaded * 100) / event.total)
        // @ts-ignore
        setStore({
          ...store.stories,
          [item.id]: {
            ...item,
            progress: progress < 100 ? progress : 0,
            type: progress < 100 ? 'UPLOADING' : 'START FOR PROCESSING'
          }
        })
      }
    )
  }

  const addProcessor = (item: Partial<QueueItem> & NonNullable<{ id: string }>) => {
    // @ts-ignore
    setStore({ ...store.stories, [item.id]: { ...item } })
    if (item.type === 'UPLOAD') {
      upload({
        id: item.id,
        file: item.file as File,
        title: item.title as string,
        description: item.description as string
      })
    }
  }

  return (
    <QueueProcessorContext.Provider
      value={{
        actions: { addProcessor },
        store
      }}
    >
      <Component />
      {children}
    </QueueProcessorContext.Provider>
  )
}
