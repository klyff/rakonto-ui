import { atom } from 'recoil'

export interface User {
  id: string
  email: string
  firstName: string
  lasName: string
}

export const userState = atom<User | null>({
  key: 'userState',
  default: null
})
