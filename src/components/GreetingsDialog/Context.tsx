import React, { useState, createContext } from 'react'
import { iGreetingsDialog } from './index'
import Component from './Component'
import Cookies from 'js-cookie'
import { UserType } from '../../lib/types'

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
  const user: UserType = JSON.parse(Cookies.get('user') || '{}')
  const isFirstAccess = !(Cookies.get('hasAccessBefore') === user.email)
  const [stepStoryUpload, setGreetingsDialog] = useState<iGreetingsDialog>({
    isOpen: isFirstAccess
  })

  const open = () => {
    setGreetingsDialog({
      isOpen: true
    })
  }

  const close = () => {
    Cookies.set('hasAccessBefore', user.email)
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
