import { useCallback, useState } from 'react'
import { api } from '@root/api'
import { ImageUploadType } from '@root/types'

export const useCoverApi = (): {
  coverInfo: Partial<ImageUploadType>
  uploadProgress: number
  isUploadingCover: boolean
  uploadCover: (file: File) => void
  getCoverInfo: (id: string) => void
} => {
  const [isUploadingCover, setIsUploadingCover] = useState<boolean>(false)
  const [uploadProgress, setUploadProgress] = useState<number>(0)
  const [coverInfo, setCoverInfo] = useState<Partial<ImageUploadType>>({})

  const uploadCover = async (file: File) => {
    setIsUploadingCover(true)
    const result = await api.uploadImage(file, ({ loaded, total }) => {
      const progress = Math.round((loaded * 100) / total) - 1
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
