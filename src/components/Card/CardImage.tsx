import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import { MediaType } from '../../lib/types'
import CircularProgress from '@mui/material/CircularProgress'

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
    setLoading(true)
    if (!error && preview) {
      setImage(hover ? preview : thumbnail)
    } else {
      setImage(thumbnail || '')
    }
  }, [hover, error])

  const handleLoaded = () => {
    setLoading(false)
  }

  const handleError = () => {
    setLoading(false)
    setError(true)
    if (type === 'COLLECTION') {
      setImage('/images/CoverCardPlaceholder2.png')
      return
    }
    setImage('/images/CoverCardPlaceholder.png')
  }

  return (
    <Box
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
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
        onLoad={() => handleLoaded()}
        onError={() => handleError()}
      />
      {isLoading && (
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)'
          }}
        >
          <CircularProgress />
        </Box>
      )}
    </Box>
  )
}

export default CardImage
