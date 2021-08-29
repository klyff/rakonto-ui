import React, { useEffect, useState } from 'react'
import { GridItem, ImageBox } from './style'
import { Image, Loader } from 'semantic-ui-react'
import { ImageType } from '@root/types'
import { useRecoilValue } from 'recoil'
import { mediaStatusState } from '@root/states/mediaStatusState'

interface iGalleryItem {
  image: ImageType
}

const GalleryItem: React.FC<iGalleryItem> = ({ image }) => {
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
      <ImageBox>
        {!progress ? (
          <Image src={src} size="big" />
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
