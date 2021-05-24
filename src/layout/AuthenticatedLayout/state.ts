import { atom, selector } from 'recoil'
import { mediaQueryState } from '@root/states/mediaQueryState'

export const getIsMobile = selector<boolean>({
  key: 'getIsMobile',
  get: ({ get }) => {
    return !get(mediaQueryState).isMobile
  }
})

export const sidebarState = atom<boolean>({
  key: 'sidebarState',
  default: getIsMobile
})
