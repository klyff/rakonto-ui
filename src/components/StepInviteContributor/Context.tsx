import React, { useState, createContext } from 'react'
import Component from './Component'

// @ts-ignore
export const StepInviteContributorContext = createContext<{
  actions: {
    open: (id: string) => void
    close: () => void
  }
}>({
  // @ts-ignore
  actions: {}
})

export const StepInviteContributorProvider: React.FC = ({ children }) => {
  const [stepStoryUpload, setStepInviteContributor] = useState<boolean>(false)
  const [storyId, setStoryId] = useState<string>('')

  const open = (id: string) => {
    setStoryId(id)
    setStepInviteContributor(true)
  }

  const close = () => {
    setStoryId('')
    setStepInviteContributor(false)
  }

  return (
    <StepInviteContributorContext.Provider
      value={{
        actions: {
          open,
          close
        }
      }}
    >
      {stepStoryUpload && <Component storyId={storyId} />}
      {children}
    </StepInviteContributorContext.Provider>
  )
}
