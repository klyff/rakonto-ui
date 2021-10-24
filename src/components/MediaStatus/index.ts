export interface iMediaStatus {
  [key: string]: {
    progress: number
    finished: boolean
    payload: any
  }
}

export { MediaStatusContext, MediaStatusProvider } from './Context'
