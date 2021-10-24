import { ReactNode } from 'react'

export interface iSimpleDialog {
  isOpen: boolean
  title: string
  content: string | ReactNode
  okText?: string
  showOk?: boolean
  cancelText?: string
}

export { SimpleDialogProvider, SimpleDialogContext } from './Context'
