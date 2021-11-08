import { MediaType } from '../../lib/types'

export type QueueItem = {
  id: string
  title?: string
  description?: string
  file?: File
  type?: MediaType | 'FILE'
  step: 'PROCESSING' | 'UPLOAD' | 'UPLOADING' | 'START FOR PROCESSING' | 'FINISHED' | 'ERROR' | 'UPLOADED'
  progress?: number
  finished?: boolean
}

export { QueueProcessorContext, QueueProcessorProvider } from './Context'
