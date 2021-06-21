import { atom } from 'recoil'
import { ReactNode } from 'react'

interface iBasicModalState {
  open: boolean
  title: string
  content: string | ReactNode
  isConfirmation?: boolean
  type?: 'default' | 'error' | 'warning'
  onClose?: (isSuccess: boolean) => void
}

export const basicModalState = atom<iBasicModalState>({
  key: 'basicModalState',
  default: {
    open: false,
    title: '',
    content: '',
    type: 'default'
  }
})
