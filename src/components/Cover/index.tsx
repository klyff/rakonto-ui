import React from 'react'
import Box from '@mui/material/Box'
import { UserType } from '../../lib/types'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import AuthorAvatar from '../AuthorAvatar'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import { format, parseJSON } from 'date-fns'

interface iCover {
  src: string
  title: string
  subtitle?: string
  buttonLabel: string
  description: string
  hidePlayButton?: boolean
  author?: UserType
  onClick: () => void
  date?: string
}

const Cover: React.FC<iCover> = ({
  src,
  date,
  buttonLabel,
  onClick,
  title,
  subtitle,
  description,
  author,
  hidePlayButton
}) => {
  const fullName = `${author?.firstName} ${author?.lastName}`

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        aspectRatio: '16/9',
        height: '720px',
        backgroundImage: `url(${src || '/images/CoverDefault.png'})`,
        backgroundSize: src ? 'contain' : 'cover',
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
            width: { xs: 'unset', md: '100%' },
            maxWidth: 684,
            marginLeft: 3,
            marginTop: 20,
            position: 'relative'
          }}
        >
          {subtitle && (
            <Typography
              sx={{ fontWeight: 400, textTransform: 'uppercase' }}
              gutterBottom
              color="secondary"
              variant="subtitle1"
            >
              {subtitle}
            </Typography>
          )}
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
              mb: 4
            }}
          >
            <AuthorAvatar prefix={'By'} fullName={fullName} thumbnail={author?.picture?.url} />
            {date && <Typography variant="caption">{`on ${format(parseJSON(date), 'PPPp')}`}</Typography>}
          </Box>

          {!hidePlayButton && (
            <Button onClick={onClick} startIcon={<PlayArrowIcon />} variant="contained">
              {buttonLabel}
            </Button>
          )}
        </Box>
      </Box>
    </Box>
  )
}

export default Cover
