import { atom } from 'recoil'

export const InfoModalState = atom<{ open: boolean; title: string; content: string }>({
  key: 'infoModalState',
  default: {
    open: false,
    title: '',
    content: ''
  }
})
