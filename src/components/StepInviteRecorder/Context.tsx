import React, { useState, createContext } from 'react'
import Component from './Component'

// @ts-ignore
export const StepInviteRecorderContext = createContext<{
  actions: {
    open: () => void
    close: () => void
  }
}>({
  // @ts-ignore
  actions: {}
})

export const StepInviteRecorderProvider: React.FC = ({ children }) => {
  const [stepStoryUpload, setStepInviteRecorder] = useState<boolean>(true)

  const open = () => {
    setStepInviteRecorder(true)
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
      {stepStoryUpload && <Component />}
      {children}
    </StepInviteRecorderContext.Provider>
  )
}
