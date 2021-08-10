import React, { useEffect, useState } from 'react'
import { Progress } from 'semantic-ui-react'
import { Layout, ColumnForm, ColumnPreview, Header } from '../style'
import { GridImages, UploadButtonArea, ProgressBox } from './style'
import ImageViewer from '@root/components/suport/ImageViewer'
import { GalleryType } from '@root/types'
import UploadButton from '@root/components/suport/UploadButton'
import { api } from '@root/api'
import LoadingArea from '@root/components/suport/LoadingArea'
import GalleryItem from './GalleryItem'
import { toast } from 'react-semantic-toasts'

interface iGallery {
  galleries: GalleryType[]
  storyId: string
  refresh: () => void
  isLoading: boolean
}

const Gallery: React.FC<iGallery> = ({ children, isLoading, galleries, storyId, refresh }) => {
  const [selectedImage, setSelectedImage] = useState<number | null>(0)
  const [showPreview, setShowPreview] = useState<boolean>(false)
  const [progressFiles, setProgressFiles] = useState<Record<string, number>>({})
  const [progress, setProgress] = useState<number>(0)
  const [totalFiles, setTotalFiles] = useState<number>(0)

  const handleShowPreview = (index: number) => {
    setSelectedImage(index)
    setShowPreview(true)
  }

  const handleDelete = async (id: string) => {
    await api.deleteGallery(id)
    refresh()
  }

  useEffect(() => {
    const max = totalFiles * 100
    const allValues = Object.values(progressFiles)
    const current = allValues.reduce((a, b) => a + b, 0)
    setProgress((current / max) * 100)
  }, [progressFiles, totalFiles])

  const upload = async (file: File) => {
    try {
      const image = await api.uploadImage(file, ({ loaded, total }) => {
        const progress = Math.round((loaded * 100) / total)
        setProgressFiles(prevValue => {
          prevValue[file.name] = progress < 0 ? 0 : progress
          return { ...prevValue }
        })
      })
      await api.createGallery(storyId, image.id)
    } catch (error) {
      toast({
        type: 'error',
        title: error.response.data.message,
        time: 3000,
        description: `Error: ${error.response.data.code}`
      })
    }
  }

  const handleSelected = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files?.length) return
    const files = Array.from(event.target.files)
    setTotalFiles(files.length)
    await Promise.all(files.map(file => upload(file)))
    refresh()
    setProgressFiles({})
    setTotalFiles(0)
    setProgress(0)
  }

  return (
    <Layout>
      <LoadingArea isLoading={isLoading}>
        <ColumnForm>
          <Header>Create a photo gallery to accompany and enhance your story.</Header>
          <UploadButtonArea>
            <UploadButton accept="image/*" onSelected={handleSelected} disabled={!!progress} primary multiple={true}>
              Upload photos
            </UploadButton>
            <ProgressBox>{!!progress && <Progress percent={progress} progress={true} />}</ProgressBox>
          </UploadButtonArea>
          <GridImages>
            {galleries.map((value, index) => {
              return (
                <GalleryItem
                  key={value.id}
                  image={value.image}
                  onClick={() => handleShowPreview(index)}
                  onDeleteClick={() => handleDelete(value.id)}
                />
              )
            })}
          </GridImages>
        </ColumnForm>
        <ImageViewer
          images={galleries.map(gallery => gallery.image)}
          index={selectedImage}
          show={showPreview}
          onNextClick={() => {
            if (selectedImage === null) return
            setSelectedImage(selectedImage + 1)
          }}
          onPrevClick={() => {
            if (selectedImage === null) return
            setSelectedImage(selectedImage - 1)
          }}
          onClose={() => {
            setShowPreview(false)
            setSelectedImage(null)
          }}
        />
        <ColumnPreview>{children}</ColumnPreview>
      </LoadingArea>
    </Layout>
  )
}

export default Gallery
