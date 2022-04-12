import React, { useState } from 'react'
import { GalleryType } from '../../lib/types'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import Modal from '@mui/material/Modal'

interface iImageViewer {
  images: GalleryType[]
  index: number
  onClose: () => void
}
const ImageViewer: React.FC<iImageViewer> = ({ images, index = 0, onClose }) => {
  const [current, setCurrent] = useState<number>(index)

  const handleNext = () => {
    setCurrent(current + 1)
  }

  const handlePrev = () => {
    setCurrent(current - 1)
  }

  const selectedImage = images[current].image

  return (
    <Modal
      sx={{
        backgroundColor: 'brackground.paper'
      }}
      open
    >
      <Box
        sx={{
          display: 'flex',
          flexFlow: 'column'
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            '& > i': {
              cursor: 'pointer'
            }
          }}
        >
          <IconButton name="close" onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          {(current || 0) > 0 && (
            <IconButton onClick={handlePrev} disabled={current === 0}>
              <ChevronLeftIcon />
            </IconButton>
          )}
          <Box
            sx={{
              maxWidth: '90vw',
              minWidth: '85vw',
              height: '95vh',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              mt: 1
            }}
          >
            <Box
              component="img"
              sx={{
                objectFit: 'contain',
                width: '100%',
                height: '100%'
              }}
              src={selectedImage?.url}
            />
          </Box>
          {(current || 0) < images.length - 1 && (
            <IconButton onClick={handleNext} disabled={current === images.length}>
              <ChevronRightIcon />
            </IconButton>
          )}
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            position: 'absolute',
            bottom: '10px',
            right: '10px'
          }}
        >
          {selectedImage?.originalName} | {(current || 0) + 1} of {images.length}
        </Box>
      </Box>
    </Modal>
  )
}

export default ImageViewer
