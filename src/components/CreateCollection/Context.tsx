import React, { useState, createContext } from 'react'
import Component from './Component'
import { CollectionType } from '../../lib/types'

// @ts-ignore
export const CreateCollectionContext = createContext<{
  actions: {
    open: (callback: (collection: CollectionType | null) => void, title?: string) => void
    close: (collection?: CollectionType) => void
  }
}>({
  // @ts-ignore
  actions: {}
})

export const CreateCollectionProvider: React.FC = ({ children }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [initialTitle, setInitialTitle] = useState<string>('')

  const [callBack, setCallBack] = useState<((collection: CollectionType | null) => void) | undefined>(undefined)

  const open = (callback: (collection: CollectionType | null) => void, title?: string) => {
    setIsOpen(true)
    if (title) setInitialTitle(title)
    setCallBack(() => callback)
  }

  const close = (collection?: CollectionType) => {
    setIsOpen(false)
    setInitialTitle('')
    if (callBack) callBack(collection || null)
    setCallBack(undefined)
  }

  return (
    <CreateCollectionContext.Provider
      value={{
        actions: {
          open,
          close
        }
      }}
    >
      {isOpen && <Component initialTitle={initialTitle} />}
      {children}
    </CreateCollectionContext.Provider>
  )
}
