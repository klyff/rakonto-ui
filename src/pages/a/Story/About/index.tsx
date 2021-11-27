import React, { useContext, useEffect, useState } from 'react'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import IconButton from '@mui/material/IconButton'
import CreateIcon from '@mui/icons-material/Create'
import DeleteIcon from '@mui/icons-material/Delete'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Switch from '@mui/material/Switch'
import ImageIcon from '@mui/icons-material/Image'
import { useFormik } from 'formik'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import LoadingButton from '@mui/lab/LoadingButton'
import schema from './schema'
import { CollectionFormType, ImageType, StoryUpdateType } from '../../../../lib/types'
import { DropEvent, FileRejection, useDropzone } from 'react-dropzone'
import api from '../../../../lib/api'
import { SimpleSnackbarContext } from '../../../../components/SimpleSnackbar'
import { isStoryPublished, updateStoryStatus } from '../../../../lib/api/services'

interface iAbout {
  title: string
  id: string
  description: string
  canEdit: boolean
  update: ((formData: StoryUpdateType) => void) | ((formData: CollectionFormType) => void)
  onChange?: (image: ImageType) => void
  loadPublished?: boolean
}

const About: React.FC<iAbout> = ({ update, title, id, description, canEdit, children, onChange, loadPublished }) => {
  const { actions: snackActions } = useContext(SimpleSnackbarContext)
  const [editMode, setEditMode] = useState<boolean>(false)
  const [progress, setProgress] = useState<number>(0)
  const [published, setPublished] = useState<boolean>(loadPublished || false)
  const initialValues = { title: title, description: description }

  const onSubmit = async (values: { title: string; description: string }) => {
    try {
      await update({ ...values })
      setEditMode(false)
    } catch (error) {}
  }

  const fetchIsPublished = async () => {
    setPublished(await api.isStoryPublished(id))
  }

  const handlePublished = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      await api.updateStoryStatus(id, event.target.checked)
      fetchIsPublished()
    } catch (error) {
      snackActions.open(`Problem to make this ${event.target.checked ? 'draft' : 'published'}`)
    }
  }

  useEffect(() => {
    fetchIsPublished()
  }, [id])

  const { isSubmitting, values, handleBlur, handleChange, touched, errors, handleSubmit } = useFormik({
    initialValues,
    validationSchema: schema,
    onSubmit
  })

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

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        flexFlow: 'column',
        '&>*': {
          margin: '12px 0'
        }
      }}
    >
      {canEdit && (
        <>
          <Box
            sx={{
              width: '100%',
              padding: '0 24px'
            }}
            component={Paper}
          >
            <Stack direction="row" {...getRootProps()}>
              <FormGroup>
                <FormControlLabel
                  control={<Switch checked={published} onChange={handlePublished} defaultChecked />}
                  label={published ? 'Published' : 'Draft'}
                />
              </FormGroup>
              <Button color="secondary" startIcon={<DeleteIcon />}>
                Delete
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
              <Button color="secondary" startIcon={<DeleteIcon />}>
                Delete
              </Button>
            </Stack>
          </Box>
        </>
      )}
      <Box
        component={Paper}
        sx={{
          width: '100%',
          padding: 3
        }}
      >
        {!editMode && (
          <>
            <Box
              sx={{
                width: '100%',
                display: 'flex'
              }}
            >
              <Typography
                sx={{
                  flex: '1'
                }}
                variant="h4"
                gutterBottom
              >
                {title}
              </Typography>
              {canEdit && (
                <div>
                  <IconButton onClick={() => setEditMode(true)}>
                    <CreateIcon />
                  </IconButton>
                </div>
              )}
            </Box>
            <Typography variant="h5" paragraph>
              {'    ' + description}
            </Typography>
          </>
        )}
        {editMode && (
          <form>
            <Grid container spacing={4} direction="row" justifyContent="center" alignItems="center">
              <Grid item xs={12}>
                <TextField
                  name="title"
                  fullWidth
                  label="Title"
                  value={values.title}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.title && Boolean(errors.title)}
                  helperText={(touched.title && errors.title) || ' '}
                />
                <TextField
                  name="description"
                  fullWidth
                  multiline
                  rows={4}
                  label="Description"
                  value={values.description}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.description && Boolean(errors.description)}
                  helperText={(touched.description && errors.description) || ' '}
                />
              </Grid>
              <Grid
                sx={{
                  textAlign: 'end'
                }}
                item
                xs={12}
              >
                <Button onClick={() => setEditMode(false)}>Cancel</Button>
                <Button color={'primary'} disabled={isSubmitting} variant="contained" onClick={() => handleSubmit()}>
                  Save
                </Button>
              </Grid>
            </Grid>
          </form>
        )}
      </Box>
      <Box component={Paper}>{children}</Box>
    </Box>
  )
}

export default About