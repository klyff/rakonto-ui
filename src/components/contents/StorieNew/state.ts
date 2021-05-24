import { atom } from 'recoil'

export const uploadFileState = atom<File | null>({
  key: 'uploadFileState',
  default: null
})

export const fileProgressState = atom<number>({
  key: 'fileProgressState',
  default: 0
})
