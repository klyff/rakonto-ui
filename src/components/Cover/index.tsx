import React, { useContext, useState } from 'react'
import Box from '@mui/material/Box'
import { ImageType, UserType } from '../../lib/types'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import AuthorAvatar from '../AuthorAvatar'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import IconButton from '@mui/material/IconButton'
import CreateIcon from '@mui/icons-material/Create'
import { ApiContext } from '../../lib/api'
import { DropEvent, FileRejection, useDropzone } from 'react-dropzone'

interface iCover {
  src: string
  title: string
  buttonLabel: string
  description: string
  author?: UserType
  onClick: () => void
  onChange?: (image: ImageType) => void
  canEdit: boolean
}

const Cover: React.FC<iCover> = ({ src, buttonLabel, onClick, title, description, author, canEdit, onChange }) => {
  const { api } = useContext(ApiContext)
  const [hover, setHover] = useState<boolean>(false)
  const [progress, setProgress] = useState<number>(0)

  const onDrop: <T extends File>(acceptedFiles: T[], fileRejections: FileRejection[], event: DropEvent) => void =
    async acceptedFiles => {
      const selectedFile = acceptedFiles[0]
      const image = await api().uploadImage(selectedFile, event => {
        setProgress(Math.round((event.loaded * 100) / event.total))
      })
      setProgress(0)
      onChange && onChange(image)
    }

  const { getRootProps, getInputProps, open } = useDropzone({
    onDrop,
    noClick: true,
    noDrag: true,
    accept: 'image/png, image/jpeg'
  })

  const fullName = `${author?.firstName} ${author?.lastName}`

  return (
    <Box
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
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
        {...getRootProps()}
        sx={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.90) 35%, transparent 100%);`
        }}
      >
        <input {...getInputProps()} />
        {hover && (
          <Box
            sx={{
              position: 'absolute',
              top: 32,
              right: 32
            }}
          >
            <IconButton onClick={open}>
              <CreateIcon />
            </IconButton>
          </Box>
        )}
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
