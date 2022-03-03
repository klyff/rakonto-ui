import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import { MediaType } from '../../lib/types'
import Skeleton from '@mui/material/Skeleton'

interface iCardImage {
  thumbnail: string
  preview?: string
  type?: MediaType | 'COLLECTION'
}

const CardImage: React.FC<iCardImage> = ({ type, thumbnail, preview }) => {
  const [isLoading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<boolean>(false)
  const [image, setImage] = useState<string>(
    type === 'COLLECTION' ? '/images/CoverCardPlaceholder2.png' : '/images/CoverCardPlaceholder.png'
  )
  const [hover, setHover] = useState<boolean>(false)

  useEffect(() => {
    if (!error && preview) {
      setImage(hover ? preview : thumbnail)
    } else {
      setImage(thumbnail || '')
    }
  }, [hover, error])

  const handleError = () => {
    if (type === 'COLLECTION') {
      setImage('/images/CoverCardPlaceholder2.png')
      return
    }
    setImage('/images/CoverCardPlaceholder.png')
  }

  return (
    <Box
      onMouseEnter={() => {
        !error && setHover(true)
      }}
      onMouseLeave={() => {
        !error && setHover(false)
      }}
      sx={{
        position: 'relative',
        width: '100%',
        height: '100%'
      }}
    >
      <Box
        component="img"
        sx={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center',
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
          display: !isLoading ? 'block' : 'none'
        }}
        src={image}
        alt="preview"
        onLoadStart={() => {
          setLoading(true)
        }}
        onLoad={() => {
          setLoading(false)
        }}
        onError={() => {
          handleError()
          setLoading(false)
          setError(true)
        }}
      />
      {isLoading && (
        <Box
          sx={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            top: '0',
            left: '0',
            zIndex: '1'
          }}
        >
          <Skeleton
            variant="rectangular"
            animation="wave"
            sx={{
              borderTopLeftRadius: 8,
              borderTopRightRadius: 8,
              width: '100%',
              height: '100%'
            }}
          />
        </Box>
      )}
    </Box>
  )
}

export default CardImage
