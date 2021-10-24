import React, { useState, createContext, ReactNode } from 'react'
import { iSimpleDialog } from './index'
import Component from './Component'

// @ts-ignore
export const SimpleDialogContext = createContext<{
  actions: {
    open: (
      title: string,
      content: string | ReactNode,
      buttonsInfo?: { okText?: string; showOk?: boolean; cancelText?: string }
    ) => void
    close: () => void
  }
  store: Partial<iSimpleDialog>
}>({
  // @ts-ignore
  actions: {},
  store: {
    isOpen: false,
    content: '',
    title: '',
    cancelText: 'Close',
    okText: 'Ok',
    showOk: false
  }
})

export const SimpleDialogProvider: React.FC = ({ children }) => {
  const [dialog, setDialog] = useState<iSimpleDialog>({
    isOpen: false,
    content: '',
    title: '',
    cancelText: 'Close',
    okText: 'Ok',
    showOk: false
  })

  const open = (
    title: string,
    content: string | ReactNode,
    buttonsInfo?: { okText?: string; showOk?: boolean; cancelText?: string }
  ) => {
    setDialog({
      ...dialog,
      isOpen: true,
      title,
      content,
      ...buttonsInfo
    })
  }

  const close = () => {
    setDialog({
      isOpen: false,
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
        },
        store: dialog
      }}
    >
      <Component />
      {children}
    </SimpleDialogContext.Provider>
  )
}
