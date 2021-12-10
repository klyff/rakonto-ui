import React, { useState, createContext, ReactNode } from 'react'
import { iFormDialog } from './index'
import Component from './Component'

// @ts-ignore
export const FormDialogContext = createContext<{
  actions: {
    open: (
      title: string,
      content: string,
      fields: {
        name: string
        placeholder: string
        label: string
        type?: React.InputHTMLAttributes<unknown>['type']
      }[],
      initialValues: any,
      validationSchema: any,
      submit: any,
      buttonsInfo: { okText: string; cancelText?: string }
    ) => void
    close: () => void
  }
  store: Partial<iFormDialog>
}>({
  // @ts-ignore
  actions: {},
  store: {
    isOpen: false,
    content: '',
    title: '',
    cancelText: 'Close',
    okText: 'Ok'
  }
})

export const FormDialogProvider: React.FC = ({ children }) => {
  const [dialog, setDialog] = useState<iFormDialog>({
    isOpen: false,
    content: '',
    fields: [],
    title: '',
    initialValues: {},
    validationSchema: null,
    submit: null,
    cancelText: 'Cancel',
    okText: 'Ok'
  })

  const open = (
    title: string,
    content: string | ReactNode,
    fields: {
      name: string
      placeholder: string
      label: string
    }[],
    initialValues: any,
    validationSchema: any,
    submit: any,
    buttonsInfo?: { okText?: string; showOk?: boolean; cancelText?: string }
  ) => {
    setDialog({
      ...dialog,
      isOpen: true,
      title,
      content,
      fields,
      validationSchema,
      initialValues,
      submit,
      ...buttonsInfo
    })
  }

  const close = () => {
    setDialog({
      isOpen: false,
      title: '',
      content: '',
      fields: [],
      initialValues: {},
      validationSchema: null,
      submit: null,
      cancelText: 'Cancel',
      okText: 'Ok'
    })
  }

  return (
    <FormDialogContext.Provider
      value={{
        actions: {
          close,
          open
        },
        store: dialog
      }}
    >
      {dialog.isOpen && <Component />}
      {children}
    </FormDialogContext.Provider>
  )
}
