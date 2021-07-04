import React, { useState } from 'react'
import { Progress } from 'semantic-ui-react'
import { Layout, ColumnForm, ColumnPreview } from '../style'
import { GridImages, UploadButtonArea, ProgressBox } from './style'
import ImageViewer from '@root/components/suport/ImageViewer'
import { GalleryType } from '@root/types'
import UploadButton from '@root/components/suport/UploadButton'
import { api } from '@root/api'
import LoadingArea from '@root/components/suport/LoadingArea'
import GalleryItem from './GalleryItem'

interface iGallery {
  galleries: GalleryType[]
  storyId: string
  refresh: () => void
  isLoading: boolean
}

const Gallery: React.FC<iGallery> = ({ children, isLoading, galleries, storyId, refresh }) => {
  const [selectedImage, setSelectedImage] = useState<number>(0)
  const [showPreview, setShowPreview] = useState<boolean>(false)
  const [progress, setProgress] = useState<number>(0)

  const handleShowPreview = (index: number) => {
    setSelectedImage(index)
    setShowPreview(true)
  }

  const handleDelete = async (id: string) => {
    await api.deleteGallery(id)
    refresh()
  }

  const handleSelected = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files?.length) return
    const file: File = event.target.files[0]
    const image = await api.uploadImage(file, ({ loaded, total }) => {
      const progress = Math.round((loaded * 100) / total)
      if (progress === 100) {
        setProgress(0)
        return
      }
      setProgress(progress < 0 ? 0 : progress)
    })
    await api.createGallery(storyId, image.id)
    refresh()
  }

  return (
    <Layout>
      <LoadingArea isLoading={isLoading}>
        <ColumnForm>
          <UploadButtonArea>
            <UploadButton onSelected={handleSelected} disabled={!!progress}>
              Upload new picture
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
            setSelectedImage(selectedImage + 1)
          }}
          onPrevClick={() => {
            setSelectedImage(selectedImage - 1)
          }}
          onClose={() => setShowPreview(false)}
        />
        <ColumnPreview>{children}</ColumnPreview>
      </LoadingArea>
    </Layout>
  )
}

export default Gallery
