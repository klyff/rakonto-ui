export interface iMediaQueueProcessor {
  [key: string]: {
    progress: number
    finished: boolean
    payload: any
  }
}

export { MediaQueueProcessorContext, MediaQueueProcessorProvider } from './Context'
