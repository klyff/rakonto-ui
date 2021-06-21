import { atom } from 'recoil'
import { ReactNode } from 'react'
import { FormikValues } from 'formik'

interface iFormModalState {
  open: boolean
  title: string
  content: string | ReactNode
  type?: 'default' | 'error' | 'warning'
  isConfirmation?: boolean
  onClose?: (isSuccess: boolean) => void
  initialValues: FormikValues
  validationSchema: unknown
  onSubmit: (values: FormikValues) => void
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
    onSubmit: () => undefined
  }
})
