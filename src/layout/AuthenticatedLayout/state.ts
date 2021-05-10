import { atom } from 'recoil'

export const sidebarState = atom<boolean>({
  key: 'infoModalState',
  default: true
})
