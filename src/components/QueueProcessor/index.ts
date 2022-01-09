import { MediaType } from '../../lib/types'

export type QueueItem = {
  id: string
  title?: string
  description?: string
  file?: File
  type?: MediaType | 'FILE'
  action?: 'NEW' | 'REPLACE'
  step: 'PROCESSING' | 'UPLOAD' | 'UPLOADING' | 'START THE CONVERSION PROCESS' | 'FINISHED' | 'ERROR' | 'UPLOADED'
  progress?: number
  finished?: boolean
}

export { QueueProcessorContext, QueueProcessorProvider } from './Context'
