import React, { useState, createContext } from 'react'
import { iCreateCollection } from './index'
import Component from './Component'

// @ts-ignore
export const CreateCollectionContext = createContext<{
  actions: {
    open: () => void
    close: () => void
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

  const open = () => {
    setCreateCollection({
      isOpen: true
    })
  }

  const close = () => {
    setCreateCollection({
      isOpen: false
    })
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
