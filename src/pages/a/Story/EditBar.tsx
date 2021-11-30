import React, { useContext, useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import { Link, useHistory } from 'react-router-dom'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Switch from '@mui/material/Switch'
import Button from '@mui/material/Button'
import UploadIcon from '@mui/icons-material/Upload'
import LoadingButton from '@mui/lab/LoadingButton'
import ImageIcon from '@mui/icons-material/Image'
import DeleteIcon from '@mui/icons-material/Delete'
import { CollectionType, ImageType } from '../../../lib/types'
import { DropEvent, FileRejection, useDropzone } from 'react-dropzone'
import api from '../../../lib/api'
import { SimpleDialogContext } from '../../../components/SimpleDialog'
import { SimpleSnackbarContext } from '../../../components/SimpleSnackbar'

interface iEditBar {
  collection: CollectionType
  canEdit: boolean
  id: string
  onChange?: (image: ImageType) => void
  loadPublished?: boolean
}

const EditBar: React.FC<iEditBar> = ({ collection, canEdit, id, onChange, loadPublished }) => {
  const { actions: snackActions } = useContext(SimpleSnackbarContext)
  const { actions: dialogActions } = useContext(SimpleDialogContext)
  const history = useHistory()
  const [progress, setProgress] = useState<number>(0)
  const [published, setPublished] = useState<boolean>(loadPublished || false)

  const fetchIsPublished = async () => {
    setPublished(await api.isStoryPublished(id))
  }

  const handlePublished = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      await api.updateStoryStatus(id, event.target.checked)
      fetchIsPublished()
    } catch (error) {
      // @ts-ignore
      const { data } = error

      if (data.code) {
        snackActions.open(data.message)
        return
      }
      snackActions.open(`Problem to make this ${event.target.checked ? 'draft' : 'published'}`)
    }
  }

  useEffect(() => {
    fetchIsPublished()
  }, [id])

  const onDrop: <T extends File>(acceptedFiles: T[], fileRejections: FileRejection[], event: DropEvent) => void =
    async acceptedFiles => {
      try {
        const selectedFile = acceptedFiles[0]
        const image = await api.uploadImage(selectedFile, event => {
          setProgress(Math.round((event.loaded * 100) / event.total))
        })
        setProgress(0)
        onChange && onChange(image)
      } catch (error) {
        snackActions.open('Something was wrong! please try again.')
        setProgress(0)
      }
    }

  const {
    getRootProps,
    getInputProps,
    open: openUpload
  } = useDropzone({
    onDrop,
    noClick: true,
    noDrag: true,
    accept: 'image/png, image/jpeg'
  })

  const handleDelete = () => {
    dialogActions.open(
      'Delete forever',
      <>
        <Typography fontWeight="700">Definitely delete this story?</Typography>
        <Typography>This action cannot be undone after that.</Typography>
      </>,
      {
        okText: 'Yes, delete',
        showOk: true,
        cancelText: 'No, keep as is'
      },
      async value => {
        if (value) {
          try {
            await api.deleteStory(id)
            history.push('/a/my-library')
          } catch (error) {
            // @ts-ignore
            const { data } = error
            if (data.code) {
              snackActions.open(data.message)
              return
            }
            snackActions.open('Something was wrong! please try again.')
          }
        }
      }
    )
  }
  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        padding: '0 24px',
        height: 65
      }}
      component={Paper}
    >
      <Box
        component={Link}
        to={`/a/collections/${collection?.id}?storyId=${id}`}
        sx={{
          flex: 1,
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <ArrowBackIcon />
        <Typography sx={{ paddingLeft: 1 }}>{collection?.title}</Typography>
      </Box>
      {canEdit && (
        <Stack direction="row" {...getRootProps()}>
          <Box
            sx={{
              width: '134px',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <FormGroup>
              <FormControlLabel
                control={<Switch checked={published} onChange={handlePublished} />}
                label={published ? 'Published' : 'Draft'}
              />
            </FormGroup>
          </Box>
          <Button color="secondary" startIcon={<UploadIcon />}>
            Replace video/ audio
          </Button>
          <input {...getInputProps()} />
          <LoadingButton
            loadingPosition="start"
            loading={!!progress}
            onClick={openUpload}
            color="secondary"
            startIcon={<ImageIcon />}
          >
            Thumbnail
          </LoadingButton>
          <Button color="secondary" onClick={handleDelete} startIcon={<DeleteIcon />}>
            Delete
          </Button>
        </Stack>
      )}
    </Box>
  )
}

export default EditBar
