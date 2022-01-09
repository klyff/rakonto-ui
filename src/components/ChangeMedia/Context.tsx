import React, { useState, createContext } from 'react'
import { iChangeMedia } from './index'
import Component from './Component'

// @ts-ignore
export const ChangeMediaContext = createContext<{
  actions: {
    open: (id: string) => void
    close: () => void
  }
  store: iChangeMedia
}>({
  // @ts-ignore
  actions: {},
  store: {
    isOpen: false
  }
})

export const ChangeMediaProvider: React.FC = ({ children }) => {
  const [stepStoryUpload, setChangeMedia] = useState<iChangeMedia>({
    isOpen: false
  })
  const [selectedStory, setSelectedStory] = useState<string>('')

  const open = (id: string) => {
    setSelectedStory(id)
    setChangeMedia({
      isOpen: true
    })
  }

  const close = () => {
    setSelectedStory('')
    setChangeMedia({
      isOpen: false
    })
  }

  return (
    <ChangeMediaContext.Provider
      value={{
        actions: {
          open,
          close
        },
        store: stepStoryUpload
      }}
    >
      <Component storyId={selectedStory} />
      {children}
    </ChangeMediaContext.Provider>
  )
}
