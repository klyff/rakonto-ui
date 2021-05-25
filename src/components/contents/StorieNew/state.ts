import { atom } from 'recoil'
import { recoilPersist } from 'recoil-persist'

const { persistAtom } = recoilPersist()

export const fileIdState = atom<string>({
  key: 'fileIdState',
  default: '',
  effects_UNSTABLE: [persistAtom]
})

export const fileProgressState = atom<number>({
  key: 'fileProgressState',
  default: 0
})
