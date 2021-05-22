import { atom } from 'recoil'
import matchMedia from 'matchmediaquery'

export const sidebarState = atom<boolean>({
  key: 'sidebarState',
  default: !matchMedia('(max-width: 767px)').matches
})
