import { ReactNode } from 'react'

export interface iFormDialog {
  isOpen: boolean
  title: string
  content: string | ReactNode
  fields: {
    name: string
    placeholder: string
    label: string
  }[]
  okText?: string
  cancelText?: string
  initialValues: any
  validationSchema: any
  submit: any
}

export { FormDialogProvider, FormDialogContext } from './Context'
