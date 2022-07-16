import { ReactNode } from 'react'
import * as React from 'react'

export interface iFormDialog {
  isOpen: boolean
  title: string
  content: string | ReactNode
  fields: {
    name: string
    placeholder: string
    label: string
    options?: string[]
    type?: React.InputHTMLAttributes<unknown>['type']
  }[]
  okText?: string
  cancelText?: string
  initialValues: any
  validationSchema: any
  submit: any
}

export { FormDialogProvider, FormDialogContext } from './Context'
