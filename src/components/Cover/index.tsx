import React, { useContext, useState } from 'react'
import Box from '@mui/material/Box'
import { ImageType, UserType } from '../../lib/types'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import AuthorAvatar from '../AuthorAvatar'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'

interface iCover {
  src: string
  title: string
  buttonLabel: string
  description: string
  author?: UserType
  onClick: () => void
}

const Cover: React.FC<iCover> = ({ src, buttonLabel, onClick, title, description, author }) => {
  const fullName = `${author?.firstName} ${author?.lastName}`

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: 720,
        backgroundImage: `url(${src})`,
        backgroundSize: 'contain',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.90) 35%, transparent 100%);`
        }}
      >
        <Box
          sx={{
            width: '100%',
            maxWidth: 684,
            marginLeft: 3,
            marginTop: 20,
            position: 'relative'
          }}
        >
          <Typography sx={{ fontWeight: 700 }} gutterBottom variant="h3">
            {title}
          </Typography>
          <Typography
            sx={{
              fontWeight: 700,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical'
            }}
            variant="h5"
            gutterBottom
          >
            {description}
          </Typography>
          <Box
            sx={{
              paddingBottom: 3
            }}
          >
            <AuthorAvatar prefix={'By'} fullName={fullName} thumbnail={author?.picture?.url} />
          </Box>
          <Button onClick={onClick} startIcon={<PlayArrowIcon />} variant="contained">
            {buttonLabel}
          </Button>
        </Box>
      </Box>
    </Box>
  )
}

export default Cover
