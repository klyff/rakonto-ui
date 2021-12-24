import React, { useState, createContext } from 'react'
import { iCreateCollection } from './index'
import Component from './Component'
import { CollectionType } from '../../lib/types'

// @ts-ignore
export const CreateCollectionContext = createContext<{
  actions: {
    open: (callback: (collection: CollectionType) => void) => void
    close: (collection?: CollectionType) => void
  }
  store: iCreateCollection
}>({
  // @ts-ignore
  actions: {},
  store: {
    isOpen: false
  }
})

export const CreateCollectionProvider: React.FC = ({ children }) => {
  const [stepStoryUpload, setCreateCollection] = useState<iCreateCollection>({
    isOpen: false
  })

  const [callBack, setCallBack] = useState<((collection: CollectionType) => void) | undefined>(undefined)

  const open = (callback: (collection: CollectionType) => void) => {
    setCreateCollection({
      isOpen: true
    })
    setCallBack(() => callback)
  }

  const close = (collection?: CollectionType) => {
    setCreateCollection({
      isOpen: false
    })
    if (callBack && collection) callBack(collection)
    setCallBack(undefined)
  }

  return (
    <CreateCollectionContext.Provider
      value={{
        actions: {
          open,
          close
        },
        store: stepStoryUpload
      }}
    >
      <Component />
      {children}
    </CreateCollectionContext.Provider>
  )
}
