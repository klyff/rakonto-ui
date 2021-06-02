import { useState } from 'react'
import { api } from '@root/api'
import { ImageUploadType } from '@root/types'

export const useUploadCover = () => {
  const [isUploadingCover, setIsUploadingCover] = useState<boolean>(false)
  const [progress, setProgress] = useState<number>(0)
  const [coverInfo, setCoverInfo] = useState<ImageUploadType | null>(null)

  const uploadCover = async (file: File) => {
    setIsUploadingCover(true)
    const result = await api.uploadImage(file, event => {
      const progress = Math.round((event.loaded * 100) / event.total) - 1
      setProgress(progress < 0 ? 0 : progress)
    })
    setProgress(100)
    setIsUploadingCover(false)
    setCoverInfo(result)
  }

  return { coverInfo, progress, isUploadingCover, uploadCover }
}
