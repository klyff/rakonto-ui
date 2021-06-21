import React, { useState } from 'react'
import { Dimmer, Image } from 'semantic-ui-react'
import { Box, Button, PreviewArea, Footer } from './style'
import { ImageType } from '@root/types'

interface iImageViewer {
  images: ImageType[]
  initialIndex: number
  show: boolean
  onClose: () => void
}
const ImageViewer: React.FC<iImageViewer> = ({ images, show = false, initialIndex = 0, onClose }) => {
  const [index, setIndex] = useState<number>(initialIndex)

  const handleNext = () => {
    setIndex(index + 1)
  }

  const handlePrev = () => {
    setIndex(index - 1)
  }

  return (
    <Dimmer active={show} page onClickOutside={onClose}>
      <Box>
        <PreviewArea>
          <Button icon="angle left" circular size="big" onClick={handlePrev} disabled={index === 0} />
          <Image src={images[index]?.thumbnail} />
          <Button icon="angle right" circular size="big" onClick={handleNext} disabled={index === images.length} />
        </PreviewArea>
        <Footer>
          {'name'} {index + 1} of {images.length}
        </Footer>
      </Box>
    </Dimmer>
  )
}

export default ImageViewer
