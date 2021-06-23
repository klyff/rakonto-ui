import { atom } from 'recoil'

export interface MediaQueryState {
  [key: string]: {
    progress: number
    finished: boolean
    payload: any
  }
}

export const mediaStatusState = atom<MediaQueryState>({
  key: 'mediaStatusState',
  default: {}
})
