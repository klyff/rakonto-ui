import React, { useContext, useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import { SimpleDialogContext } from '../../../../components/SimpleDialog'
import Button from '@mui/material/Button'
import api from '../../../../lib/api'
import { SimpleSnackbarContext } from '../../../../components/SimpleSnackbar'
import { GalleryType } from '../../../../lib/types'
import ImageList from '@mui/material/ImageList'
import ImageListItem from '@mui/material/ImageListItem'
import ImageListItemBar from '@mui/material/ImageListItemBar'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import { DropEvent, FileRejection, useDropzone } from 'react-dropzone'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import CircularProgress from '@mui/material/CircularProgress'

interface iPhotos {
  canEdit: boolean
  storyId: string
}

const Photos: React.FC<iPhotos> = ({ canEdit, storyId }) => {
  const { actions: simpleDialogActions } = useContext(SimpleDialogContext)
  const { actions: snackActions } = useContext(SimpleSnackbarContext)
  const [photos, setPhotos] = useState<GalleryType[]>([])
  const [progress, setProgress] = useState<{ [key: string]: number }>({})

  const fetch = async () => {
    const result = await api.getGallery(0, 10000, [storyId])
    setPhotos(result.content)
  }

  useEffect(() => {
    fetch()
  }, [])

  const handleDelete = async (gallery?: GalleryType) => {
    if (!gallery) {
      snackActions.open('Something was wrong! please try again.')
      return
    }
    simpleDialogActions.open(
      'Delete image',
      <>
        <Typography component="span">Are you sure want to delete the photo</Typography>
        <Typography fontWeight="700" component="span">{` "${gallery.image.originalName}" `}</Typography>
        <Typography component="span">from this story?</Typography>
      </>,
      { okText: 'Yes, delete', showOk: true, cancelText: 'Back' },
      async success => {
        try {
          if (success) {
            await api.deleteGallery(gallery.id)
            setPhotos(photos.filter(p => p.id !== gallery.id))
            snackActions.open(`${gallery.image.originalName} removed from this story!`)
          }
        } catch (error) {
          // @ts-ignore
          const { data } = error
          if (data.code) {
            snackActions.open(`Error to add ${gallery.image.originalName} to this story!`)
            return
          }
          snackActions.open('Something was wrong! please try again.')
        }
      }
    )
  }

  const onDrop: <T extends File>(acceptedFiles: T[], fileRejections: FileRejection[], event: DropEvent) => void =
    async acceptedFiles => {
      acceptedFiles.forEach(async file => {
        const image = await api.uploadImage(file, event => {
          setProgress(old => ({ ...old, [file.name]: Math.round((event.loaded * 100) / event.total) }))
        })
        setProgress(old => {
          delete old[file.name]
          return old
        })
        const newPhoto = await api.createGallery(storyId, image.id)
        setPhotos(value => [newPhoto, ...value])
      })
    }

  const { getRootProps, getInputProps, open } = useDropzone({ onDrop, noClick: true, accept: 'image/png, image/jpeg' })

  return (
    <Box
      component={Paper}
      sx={{
        width: '100%',
        display: 'flex',
        padding: 3,
        flexFlow: 'column'
      }}
    >
      {canEdit && (
        <>
          <Box>
            <Typography sx={{ marginBottom: 3 }} gutterBottom>
              Create a photo gallery to accompany and enhance your story.
            </Typography>
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <Button variant="outlined" onClick={open} sx={{ mt: 1, mr: 1 }}>
                Upload pictures
              </Button>
            </div>
            <List>
              {Object.entries(progress).map(([k, v]) => (
                <ListItem key={k}>
                  <ListItemText primary={k} />
                  <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                    <CircularProgress variant="determinate" value={v} />
                    <Box
                      sx={{
                        top: 0,
                        left: 0,
                        bottom: 0,
                        right: 0,
                        position: 'absolute',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <Typography variant="caption" component="div" color="text.secondary">
                        {`${Math.round(v || 0)}%`}
                      </Typography>
                    </Box>
                  </Box>
                </ListItem>
              ))}
            </List>
          </Box>
        </>
      )}

      <Divider sx={{ margin: '24px 0' }} />
      <Box
        sx={{
          marginBottom: 3
        }}
      >
        {photos.length ? (
          <Box sx={{ width: '100%', minHeight: 400 }}>
            <ImageList variant="masonry" cols={3} gap={8}>
              {photos.map(photo => (
                <ImageListItem key={photo.id}>
                  <img
                    src={`${photo.image.url}`}
                    srcSet={`${photo.image.url}`}
                    alt={photo.image.originalName}
                    loading="lazy"
                  />
                  <ImageListItemBar
                    position="below"
                    title={photo.image.originalName}
                    actionIcon={
                      canEdit && (
                        <IconButton onClick={() => handleDelete(photo)} sx={{ color: 'white' }}>
                          <DeleteIcon />
                        </IconButton>
                      )
                    }
                    actionPosition="right"
                  />
                </ImageListItem>
              ))}
            </ImageList>
          </Box>
        ) : (
          <Typography align="center">No images here.</Typography>
        )}
      </Box>
    </Box>
  )
}

export default Photos
