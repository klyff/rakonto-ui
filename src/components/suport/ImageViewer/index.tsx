import React, { useEffect, useState } from 'react'
import { Dimmer, Image, Loader, Icon } from 'semantic-ui-react'
import { Box, Button, PreviewArea, Footer, Stage, Header } from './style'
import { ImageType } from '@root/types'
import { useRecoilValue } from 'recoil'
import { mediaStatusState } from '@root/states/mediaStatusState'

interface iImageViewer {
  images: ImageType[]
  index: number
  show: boolean
  onClose: () => void
  onNextClick: () => void
  onPrevClick: () => void
}
const ImageViewer: React.FC<iImageViewer> = ({
  images,
  onNextClick,
  onPrevClick,
  show = false,
  index = 0,
  onClose
}) => {
  const mediaStatus = useRecoilValue(mediaStatusState)
  const [selectedImage, setSelectedImage] = useState<ImageType | null>(null)
  const [progress, setProgress] = useState<boolean>(true)

  useEffect(() => {
    setSelectedImage(images[index])
    setProgress(!images[index].thumbnail)
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
  }, [mediaStatus])

  return (
    <Dimmer active={show} page>
      <Box>
        <Header>
          <Icon name="close" size="big" onClick={onClose} />
        </Header>
        <PreviewArea>
          {index > 0 && <Button icon="angle left" circular size="big" onClick={onPrevClick} disabled={index === 0} />}
          <Stage>
            {!progress ? (
              <Image src={selectedImage?.thumbnail} />
            ) : (
              <Loader active inverted>
                Processing...
              </Loader>
            )}
          </Stage>
          {index < images.length - 1 && (
            <Button icon="angle right" circular size="big" onClick={onNextClick} disabled={index === images.length} />
          )}
        </PreviewArea>
        <Footer>
          {selectedImage?.originalName} | {index + 1} of {images.length}
        </Footer>
      </Box>
    </Dimmer>
  )
}

export default ImageViewer
