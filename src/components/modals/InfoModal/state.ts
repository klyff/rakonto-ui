import { atom } from 'recoil'
import { ReactNode } from 'react'

export const InfoModalState = atom<{ open: boolean; title: string; content: string | ReactNode }>({
  key: 'infoModalState',
  default: {
    open: false,
    title: '',
    content: ''
  }
})
