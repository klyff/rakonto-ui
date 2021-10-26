import React, { useState, createContext } from 'react'
import { iGreetingsDialog } from './index'
import Component from './Component'
import Cookies from 'js-cookie'

// @ts-ignore
export const GreetingsDialogContext = createContext<{
  actions: {
    open: () => void
    close: () => void
  }
  store: iGreetingsDialog
}>({
  // @ts-ignore
  actions: {},
  store: {
    isOpen: false
  }
})

export const GreetingsDialogProvider: React.FC = ({ children }) => {
  const isFirstAccess = !(Cookies.get('hasAccessBefore') === 'true')
  const [stepStoryUpload, setGreetingsDialog] = useState<iGreetingsDialog>({
    isOpen: isFirstAccess
  })

  const open = () => {
    setGreetingsDialog({
      isOpen: true
    })
  }

  const close = () => {
    Cookies.set('hasAccessBefore', 'true')
    setGreetingsDialog({
      isOpen: false
    })
  }

  return (
    <GreetingsDialogContext.Provider
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
    </GreetingsDialogContext.Provider>
  )
}
