import React, { useState, createContext } from 'react'
import { iSimpleSnackbar } from './index'
import Component from './Component'

// @ts-ignore
export const SimpleSnackbarContext = createContext<{
  actions: {
    open: (message: string) => void
    close: () => void
  }
  store: Partial<iSimpleSnackbar>
}>({
  // @ts-ignore
  actions: {},
  store: {}
})

export const SimpleSnackbarProvider: React.FC = ({ children }) => {
  const [snackbar, setSnackbar] = useState<iSimpleSnackbar>({
    isOpen: false,
    message: ''
  })

  const open = (message: string) => {
    setSnackbar({
      isOpen: true,
      message
    })
  }

  const close = () => {
    setSnackbar({
      isOpen: false,
      message: ''
    })
  }

  return (
    <SimpleSnackbarContext.Provider
      value={{
        actions: {
          open,
          close
        },
        store: snackbar
      }}
    >
      <Component />
      {children}
    </SimpleSnackbarContext.Provider>
  )
}
