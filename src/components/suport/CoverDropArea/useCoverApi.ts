import { useCallback, useState } from 'react'
import { api } from '@root/api'
import { ImageType } from '@root/types'

interface iUseCoverApi {
  coverInfo?: Partial<ImageType>
  uploadProgress: number
  isUploadingCover: boolean
  upload: (file: File) => void
  getCoverInfo: (id: string) => void
  removeCover: () => void
}

export const useCoverApi = ({ cover }: { cover?: Partial<ImageType> }): iUseCoverApi => {
  const [isUploadingCover, setIsUploadingCover] = useState<boolean>(false)
  const [uploadProgress, setUploadProgress] = useState<number>(0)
  const [coverInfo, setCoverInfo] = useState<Partial<ImageType> | undefined>(cover)

  const upload = async (file: File) => {
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

  const removeCover = useCallback(async () => {
    setCoverInfo(undefined)
  }, [coverInfo])

  return { coverInfo, uploadProgress, isUploadingCover, upload, getCoverInfo, removeCover }
}
