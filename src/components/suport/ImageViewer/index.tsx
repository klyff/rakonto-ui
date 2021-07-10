import React, { useEffect, useState } from 'react'
import { Dimmer, Image, Loader, Icon } from 'semantic-ui-react'
import { Box, Button, PreviewArea, Footer, Stage, Header } from './style'
import { ImageType } from '@root/types'
import { useRecoilValue } from 'recoil'
import { mediaStatusState } from '@root/states/mediaStatusState'

interface iImageViewer {
  images: ImageType[]
  index: number | null
  show: boolean
  onClose: () => void
  onNextClick: () => void
  onPrevClick: () => void
}
const ImageViewer: React.FC<iImageViewer> = ({ images, onNextClick, onPrevClick, show = false, index, onClose }) => {
  const mediaStatus = useRecoilValue(mediaStatusState)
  const [selectedImage, setSelectedImage] = useState<ImageType | null>(null)
  const [progress, setProgress] = useState<boolean>(true)

  useEffect(() => {
    if (!images.length || index === null) return
    setSelectedImage(images[index])
    setProgress(!images[index]?.thumbnail)
  }, [index, images])

  useEffect(() => {
    if (!selectedImage) return
    const id = selectedImage.id
    if (!mediaStatus[id]) return
    const { payload, finished } = mediaStatus[id]
    setProgress(true)
    if (finished) {
      setProgress(false)
      setSelectedImage(payload)
    }
  }, [mediaStatus, selectedImage])

  const handleNext = () => {
    setProgress(true)
    onNextClick()
  }

  const handlePrev = () => {
    setProgress(true)
    onPrevClick()
  }

  return (
    <Dimmer active={show} page>
      <Box>
        <Header>
          <Icon name="close" size="big" onClick={onClose} />
        </Header>
        <PreviewArea>
          {(index || 0) > 0 && (
            <Button icon="angle left" circular size="big" onClick={handlePrev} disabled={index === 0} />
          )}
          <Stage>
            {!progress ? (
              <Image src={selectedImage?.thumbnail} />
            ) : (
              <Loader active inverted>
                Loading...
              </Loader>
            )}
          </Stage>
          {(index || 0) < images.length - 1 && (
            <Button icon="angle right" circular size="big" onClick={handleNext} disabled={index === images.length} />
          )}
        </PreviewArea>
        <Footer>
          {selectedImage?.originalName} | {(index || 0) + 1} of {images.length}
        </Footer>
      </Box>
    </Dimmer>
  )
}

export default ImageViewer
