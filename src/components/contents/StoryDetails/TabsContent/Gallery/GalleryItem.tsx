import React, { useEffect, useState } from 'react'
import { Actions, GridItem, ImageBox } from './style'
import { Image, Loader } from 'semantic-ui-react'
import { ImageType } from '@root/types'
import { useRecoilValue } from 'recoil'
import { mediaStatusState } from '@root/states/mediaStatusState'

interface iGalleryItem {
  onClick: () => void
  onDeleteClick: () => void
  image: ImageType
}

const GalleryItem: React.FC<iGalleryItem> = ({ image, onClick, onDeleteClick }) => {
  const mediaStatus = useRecoilValue(mediaStatusState)
  const [progress, setProgress] = useState<boolean>(!image.thumbnail)
  const [src, setSrc] = useState<string>(image.thumbnail)
  const id = image.id

  useEffect(() => {
    if (!mediaStatus[id]) return
    const { payload, finished } = mediaStatus[id]
    setProgress(true)
    if (finished) {
      setProgress(false)
      setSrc(payload.thumbnail)
    }
  }, [mediaStatus])

  return (
    <GridItem>
      <Actions pointing="right" icon="ellipsis vertical">
        <Actions.Menu>
          <Actions.Item text="Delete" icon="close" onClick={onDeleteClick} />
        </Actions.Menu>
      </Actions>
      <ImageBox>
        {!progress ? (
          <Image src={src} onClick={onClick} size="big" />
        ) : (
          <Loader active inverted>
            Processing...
          </Loader>
        )}
      </ImageBox>
    </GridItem>
  )
}

export default GalleryItem
