import { atom } from 'recoil'
import { ReactNode } from 'react'

interface iBasicModalState {
  open: boolean
  title: string
  content: string | ReactNode
  type?: 'default' | 'error' | 'warning'
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
