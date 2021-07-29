import React, { useState } from 'react'
import { GridImages } from './style'
import ImageViewer from '@root/components/suport/ImageViewer'
import { GalleryType } from '@root/types'
import GalleryItem from './GalleryItem'

interface iGallery {
  galleries: GalleryType[]
}

const Gallery: React.FC<iGallery> = ({ galleries }) => {
  const [selectedImage, setSelectedImage] = useState<number | null>(0)
  const [showPreview, setShowPreview] = useState<boolean>(false)

  const handleShowPreview = (index: number) => {
    setSelectedImage(index)
    setShowPreview(true)
  }

  return (
    <>
      <GridImages>
        {galleries.map((value, index) => {
          return <GalleryItem key={value.id} image={value.image} onClick={() => handleShowPreview(index)} />
        })}
      </GridImages>
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
    </>
  )
}

export default Gallery
