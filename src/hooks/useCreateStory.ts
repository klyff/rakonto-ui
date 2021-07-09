import { useState } from 'react'
import { api } from '@root/api'
import { useHistory } from 'react-router-dom'
import { toast } from 'react-semantic-toasts'

export interface Item {
  key: number
  value: string
}

export const useCreateStory = (): { createStory: (file: File) => void; progress: number; isUploading: boolean } => {
  const history = useHistory()
  const [progress, setProgress] = useState<number>(0)
  const [isUploading, setIsUploading] = useState<boolean>(false)

  const createStory = async (file: File) => {
    setIsUploading(true)
    try {
      const { id } = await api.createStory(file, event => {
        const progress = Math.round((event.loaded * 100) / event.total)
        setProgress(progress)
      })
      history.push(`/a/stories/${id}/edit`)
    } catch (error) {
      console.log(error)
      toast({
        type: 'error',
        title: error.response.data.message,
        time: 3000,
        description: `Error: ${error.response.data.code}`
      })
    } finally {
      setProgress(100)
      setIsUploading(false)
    }
  }

  return { createStory, progress, isUploading }
}
