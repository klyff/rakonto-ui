import React, { useState, useContext, useEffect } from 'react'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { useFormik, FormikValues } from 'formik'
import { CreateCollectionContext } from './Context'
import TextField from '@mui/material/TextField'
import schema from './schema'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import DeleteIcon from '@mui/icons-material/Delete'
import { DropEvent, FileRejection, useDropzone } from 'react-dropzone'
import api from '../../lib/api'
import { SimpleSnackbarContext } from '../SimpleSnackbar'
import Droparea from './Droparea'
import { ImageType } from '../../lib/types'
import { CircularProgress } from '@mui/material'

const CreateCollection = () => {
  const { store, actions } = useContext(CreateCollectionContext)
  const { actions: snackActions } = useContext(SimpleSnackbarContext)
  const [progress, setProgress] = useState<number>(0)

  const onSubmit = async ({ title, cover, description }: FormikValues) => {
    try {
      const collection = await api.createCollection({ title, coverId: cover.id, description })
      actions.close(collection)
    } catch (e) {
      console.error(e)
    }
  }

  const initialValues: { title: string; description: string; cover: ImageType | null } = {
    title: '',
    description: '',
    cover: null
  }

  const { isSubmitting, values, setFieldValue, handleBlur, handleChange, touched, errors, handleSubmit, handleReset } =
    useFormik({
      initialValues,
      validationSchema: schema,
      onSubmit
    })

  useEffect(() => {
    if (store.isOpen) {
      setProgress(0)
      handleReset(initialValues)
    }
  }, [store.isOpen])

  const onDrop: <T extends File>(acceptedFiles: T[], fileRejections: FileRejection[], event: DropEvent) => void =
    async acceptedFiles => {
      try {
        const selectedFile = acceptedFiles[0]
        const image = await api.uploadImage(selectedFile, event => {
          setProgress(Math.round((event.loaded * 100) / event.total))
        })
        setProgress(0)
        await setFieldValue('cover', image)
      } catch (error) {
        snackActions.open('Something was wrong! please try again.')
        setProgress(0)
      }
    }

  return (
    <form>
      <Dialog
        fullWidth
        maxWidth="md"
        onClose={(event, reason) => {
          if (reason !== 'backdropClick') {
            actions.close()
          }
        }}
        open={store.isOpen}
      >
        <DialogTitle>
          New collection
          <IconButton
            aria-label="close"
            onClick={() => actions.close()}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
            We recommend you upload an image with 16:9 aspect ratio and a minimum resolution of 720x540.
          </Typography>
          <Box
            sx={{
              width: '100%',
              height: 322,
              position: 'relative',
              margin: '16px 0'
            }}
          >
            {!progress && !values.cover && <Droparea onDrop={onDrop} />}
            {values.cover && (
              <Box
                sx={{
                  position: 'relative',
                  width: '100%',
                  height: 322,
                  backgroundImage: `url(${values.cover.thumbnailUrl})`,
                  backgroundSize: 'contain',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat'
                }}
              >
                <Box
                  onClick={() => setFieldValue('cover', null)}
                  sx={{
                    position: 'absolute',
                    top: '5%',
                    right: '0',
                    width: 40,
                    height: 40,
                    borderRadius: 50,
                    backgroundColor: 'primary.main',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    cursor: 'pointer'
                  }}
                >
                  <DeleteIcon
                    sx={{
                      color: 'common.black'
                    }}
                  />
                </Box>
              </Box>
            )}
            {!!progress && (
              <Box
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)'
                }}
              >
                <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                  <CircularProgress variant="determinate" value={progress} />
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
                    <Typography variant="caption" component="div" color="text.secondary">{`${Math.round(
                      progress
                    )}%`}</Typography>
                  </Box>
                </Box>
              </Box>
            )}
          </Box>
          <TextField
            key={'title'}
            name={'title'}
            fullWidth
            label={'Collection title'}
            margin="dense"
            placeholder="Type your own Collection title"
            onBlur={handleBlur}
            value={values.title}
            onChange={handleChange}
            error={touched.title && Boolean(errors.title)}
            helperText={(touched.title && errors.title) || ' '}
          />
          <TextField
            key={'description'}
            name={'description'}
            fullWidth
            multiline
            rows={4}
            label={'About'}
            placeholder="Type a description here..."
            margin="dense"
            value={values.description}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.description && Boolean(errors.description)}
            helperText={(touched.description && errors.description) || ' '}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => actions.close()} sx={{ mt: 1, mr: 1 }}>
            Cancel
          </Button>
          <Button
            disabled={isSubmitting || !!progress}
            variant="contained"
            onClick={() => handleSubmit()}
            sx={{ mt: 1, mr: 1 }}
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </form>
  )
}

export default CreateCollection
