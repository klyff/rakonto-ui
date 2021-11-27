import React, { useState, createContext, ReactNode, useEffect } from 'react'
import { iSimpleDialog } from './index'
import Component from './Component'

// @ts-ignore
export const SimpleDialogContext = createContext<{
  actions: {
    open: (
      title: string,
      content: string | ReactNode,
      buttonsInfo?: { okText?: string; showOk?: boolean; cancelText?: string },
      callback?: (success: boolean) => void
    ) => void
    close: () => void
  }
}>({
  // @ts-ignore
  actions: {}
})

export const SimpleDialogProvider: React.FC = ({ children }) => {
  const [dialog, setDialog] = useState<iSimpleDialog>({
    content: '',
    title: '',
    cancelText: 'Close',
    okText: 'Ok',
    showOk: false
  })

  const [isOpen, setIsOpen] = useState<boolean>(false)

  const open = (
    title: string,
    content: string | ReactNode,
    buttonsInfo?: { okText?: string; showOk?: boolean; cancelText?: string },
    callback?: (success: boolean) => void
  ) => {
    setDialog({
      ...dialog,
      title,
      content,
      ...buttonsInfo,
      callback
    })
    setIsOpen(true)
  }

  const close = () => {
    setIsOpen(false)
  }

  const handleClear = () => {
    setDialog({
      title: '',
      content: '',
      cancelText: 'Close',
      okText: 'Ok'
    })
  }

  return (
    <SimpleDialogContext.Provider
      value={{
        actions: {
          close,
          open
        }
      }}
    >
      {isOpen && <Component store={dialog} />}
      {children}
    </SimpleDialogContext.Provider>
  )
}
