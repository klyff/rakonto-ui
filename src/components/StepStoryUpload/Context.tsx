import React, { useState, createContext } from 'react'
import { iStepStoryUpload } from './index'
import Component from './Component'

// @ts-ignore
export const StepStoryUploadContext = createContext<{
  actions: {
    open: () => void
    close: () => void
  }
  store: iStepStoryUpload
}>({
  // @ts-ignore
  actions: {},
  store: {
    isOpen: false
  }
})

export const StepStoryUploadProvider: React.FC = ({ children }) => {
  const [stepStoryUpload, setStepStoryUpload] = useState<iStepStoryUpload>({
    isOpen: false
  })

  const open = () => {
    setStepStoryUpload({
      isOpen: true
    })
  }

  const close = () => {
    setStepStoryUpload({
      isOpen: false
    })
  }

  return (
    <StepStoryUploadContext.Provider
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
    </StepStoryUploadContext.Provider>
  )
}
