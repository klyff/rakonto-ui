import React, { useState, createContext } from 'react'
import Component from './Component'

// @ts-ignore
export const ChangeMediaContext = createContext<{
  actions: {
    open: (id: string) => void
    close: () => void
  }
}>({
  // @ts-ignore
  actions: {}
})

export const ChangeMediaProvider: React.FC = ({ children }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [selectedStory, setSelectedStory] = useState<string>('')

  const open = (id: string) => {
    setSelectedStory(id)
    setIsOpen(true)
  }

  const close = () => {
    setSelectedStory('')
    setIsOpen(false)
  }

  return (
    <ChangeMediaContext.Provider
      value={{
        actions: {
          open,
          close
        }
      }}
    >
      {isOpen && <Component storyId={selectedStory} />}
      {children}
    </ChangeMediaContext.Provider>
  )
}
