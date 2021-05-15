import { atom } from 'recoil'
import { ReactNode } from 'react'

interface iFormModalState {
  open: boolean
  title: string
  content: string | ReactNode
  type?: 'default' | 'error' | 'warning'
  onClose?: () => void
  initialValues: any
  validationSchema: any
  onSubmit: (values: any) => void
}

export const formModalState = atom<iFormModalState>({
  key: 'formModalState',
  default: {
    open: false,
    title: '',
    content: '',
    type: 'default',
    initialValues: {},
    validationSchema: '',
    onSubmit: values => undefined
  }
})
