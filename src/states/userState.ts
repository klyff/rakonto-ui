import { atom } from 'recoil'
import { UserType } from '@root/types'

export const userState = atom<UserType | null>({
  key: 'userState',
  default: null
})
