import { ReactNode } from 'react'

export interface iSimpleDialog {
  title: string
  content: string | ReactNode
  okText?: string
  showOk?: boolean
  cancelText?: string
  callback?: (success: boolean) => void
}

export { SimpleDialogProvider, SimpleDialogContext } from './Context'
