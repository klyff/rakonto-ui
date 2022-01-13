import React, { useState, useContext, useEffect } from 'react'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { useFormik, FormikValues } from 'formik'
import TextField from '@mui/material/TextField'
import schema from './schema'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import { DropEvent, FileRejection, useDropzone } from 'react-dropzone'
import api from '../../../../../lib/api'
import { SimpleSnackbarContext } from '../../../../../components/SimpleSnackbar'
import { ImageType, PersonType } from '../../../../../lib/types'
import CameraAltIcon from '@mui/icons-material/CameraAlt'
import CreateIcon from '@mui/icons-material/Create'

interface iCreateEditCollection {
  selectedPerson?: PersonType
  onClose: (person?: PersonType) => void
}

const CreateEditCollection: React.FC<iCreateEditCollection> = ({ selectedPerson, onClose }) => {
  const { actions: snackActions } = useContext(SimpleSnackbarContext)
  const [progress, setProgress] = useState<number>(0)
  const [picture, setPicture] = useState<ImageType | null>(selectedPerson?.picture || null)

  const isEditMode = !!selectedPerson?.id

  const handleClose = (person?: PersonType) => {
    onClose(person)
  }

  const onSubmit = async ({ name, link }: FormikValues) => {
    try {
      const person =
        selectedPerson?.id && selectedPerson?.id !== 'new person'
          ? await api.updatePerson(selectedPerson.id, { link, name, pictureId: picture?.id || null })
          : await api.createPerson({ link, name, pictureId: picture?.id || null })
      handleClose(person)
    } catch (e) {
      console.error(e)
    }
  }

  const initialValues: { name?: string; link?: string } = {
    name: selectedPerson?.name,
    link: selectedPerson?.link
  }

  const { isSubmitting, values, handleBlur, handleChange, touched, errors, handleSubmit } = useFormik({
    initialValues,
    validationSchema: schema,
    onSubmit
  })

  const onDrop: <T extends File>(acceptedFiles: T[], fileRejections: FileRejection[], event: DropEvent) => void =
    async acceptedFiles => {
      const selectedFile = acceptedFiles[0]
      const image = await api.uploadImage(selectedFile, event => {
        setProgress(Math.round((event.loaded * 100) / event.total))
      })
      setProgress(0)
      await setPicture(image)
    }

  const onRemove = async () => {
    await setPicture(null)
  }

  const { getRootProps, getInputProps, open } = useDropzone({ onDrop, noClick: true, accept: 'image/png, image/jpeg' })

  return (
    <form>
      <Dialog
        fullWidth
        maxWidth="md"
        onClose={(event, reason) => {
          if (reason !== 'backdropClick') {
            handleClose()
          }
        }}
        open={true}
      >
        <DialogTitle>
          {isEditMode ? 'Edit person' : 'Create person'}
          <IconButton
            aria-label="close"
            onClick={() => handleClose()}
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
          <Box
            sx={{
              paddingTop: 2,
              paddingBottom: 4,
              display: 'flex',
              flexFlow: 'row',
              alignItems: 'center'
            }}
          >
            <Box
              {...getRootProps()}
              sx={{
                height: '120px',
                width: '120px',
                borderRadius: '50%',
                border: '1px solid',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundImage: picture?.url ? `url(${picture?.url})` : 'none',
                backgroundSize: 'contain'
              }}
            >
              <input {...getInputProps()} />
              {!picture?.url && <CameraAltIcon sx={{ fontSize: 40 }} />}
            </Box>
            <Box
              sx={{
                paddingLeft: 2
              }}
            >
              <div>
                <Button onClick={open} startIcon={<CreateIcon />} variant="outlined">
                  Edit
                </Button>
                {picture?.url && (
                  <Button onClick={onRemove} color="secondary" startIcon={<CloseIcon />}>
                    Remove
                  </Button>
                )}
              </div>
              <Typography sx={{ paddingTop: 1 }} variant="h6">
                JPG or PNG. Max size of 5 MB.
              </Typography>
            </Box>
          </Box>

          <TextField
            autoFocus
            name="name"
            fullWidth
            label="Full name"
            type="text"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.name && Boolean(errors.name)}
            helperText={(touched.name && errors.name) || ' '}
          />
          <TextField
            name="link"
            fullWidth
            label="Link"
            type="text"
            value={values.link}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.link && Boolean(errors.link)}
            helperText={(touched.link && errors.link) || ' '}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose()} sx={{ mt: 1, mr: 1 }}>
            Cancel
          </Button>
          <Button
            disabled={isSubmitting || !!progress}
            variant="contained"
            onClick={() => handleSubmit()}
            sx={{ mt: 1, mr: 1 }}
          >
            {isEditMode ? 'Save' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>
    </form>
  )
}

export default CreateEditCollection
