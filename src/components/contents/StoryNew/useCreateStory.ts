import { useState } from 'react'
import { api } from '@root/api'
import { useHistory } from 'react-router-dom'

export interface Item {
  key: number
  value: string
}

export const useCreateStory = () => {
  const history = useHistory()
  const [progress, setProgress] = useState<number>(0)
  const [isUploading, setIsUploading] = useState<boolean>(false)

  const createStory = async (file: File) => {
    setIsUploading(true)
    const { id } = await api.createStory(file, event => {
      const progress = Math.round((event.loaded * 100) / event.total) - 1
      setProgress(progress < 0 ? 0 : progress)
    })
    setProgress(100)
    setIsUploading(false)
    history.push(`/a/story/new/${id}`)
  }

  return { createStory, progress, isUploading }
}
