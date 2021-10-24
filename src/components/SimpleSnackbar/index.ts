import { ReactNode } from 'react'

export interface iSimpleSnackbar {
  isOpen: boolean
  message: string | ReactNode
}
export { SimpleSnackbarProvider, SimpleSnackbarContext } from './Context'
