import React, { useState, createContext } from 'react'
import Component from './Component'
import { CollectionType } from '../../lib/types'

// @ts-ignore
export const StepInviteRecorderContext = createContext<{
  actions: {
    open: (collection: CollectionType | null) => void
    close: () => void
  }
}>({
  // @ts-ignore
  actions: {}
})

export const StepInviteRecorderProvider: React.FC = ({ children }) => {
  const [stepStoryUpload, setStepInviteRecorder] = useState<boolean>(false)
  const [collection, setCollection] = useState<CollectionType | null>(null)

  const open = (collection: CollectionType | null) => {
    setStepInviteRecorder(true)
    setCollection(collection)
  }

  const close = () => {
    setStepInviteRecorder(false)
  }

  return (
    <StepInviteRecorderContext.Provider
      value={{
        actions: {
          open,
          close
        }
      }}
    >
      {stepStoryUpload && <Component initialCollection={collection} />}
      {children}
    </StepInviteRecorderContext.Provider>
  )
}
