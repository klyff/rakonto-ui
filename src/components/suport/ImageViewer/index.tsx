import React from 'react'
import { Dimmer, Image } from 'semantic-ui-react'

interface iImageViewer {
  image: string
  onClose: () => void
}
const ImageViewer: React.FC<iImageViewer> = ({ image, onClose }) => {
  return (
    <Dimmer active={!!image} page onClickOutside={onClose}>
      <Image src={image} />
    </Dimmer>
  )
}

export default ImageViewer
