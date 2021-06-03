import { useCallback, useState } from 'react'
import { api } from '@root/api'
import { ImageUploadType } from '@root/types'

export const useCoverApi = () => {
  const [isUploadingCover, setIsUploadingCover] = useState<boolean>(false)
  const [uploadProgress, setUploadProgress] = useState<number>(0)
  const [coverInfo, setCoverInfo] = useState<ImageUploadType | null>(null)

  const uploadCover = async (file: File) => {
    setIsUploadingCover(true)
    const result = await api.uploadImage(file, event => {
      const progress = Math.round((event.loaded * 100) / event.total) - 1
      setUploadProgress(progress < 0 ? 0 : progress)
    })
    setUploadProgress(100)
    setIsUploadingCover(false)
    setCoverInfo(result)
  }

  const getCoverInfo = useCallback(
    async (id: string) => {
      const result = await api.getImage(id)
      setCoverInfo(result)
    },
    [coverInfo]
  )

  return { coverInfo, uploadProgress, isUploadingCover, uploadCover, getCoverInfo }
}
