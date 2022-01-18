import React, { useContext, useState } from 'react'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import MenuItem from '@mui/material/MenuItem'
import Button from '@mui/material/Button'
import Link from '@mui/material/Link'
import { FormikValues, useFormik } from 'formik'
import TextField from '@mui/material/TextField'
import schema from './schema'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import api from '../../../../../lib/api'
import { LanguageEnum, SubtitleType } from '../../../../../lib/types'
import Typography from '@mui/material/Typography'
import { SimpleSnackbarContext } from '../../../../../components/SimpleSnackbar'
import Dropzone, { DropEvent, FileRejection } from 'react-dropzone'
import LoadingButton from '@mui/lab/LoadingButton'
import Box from '@mui/material/Box'
import FileUploadIcon from '@mui/icons-material/FileUpload'
import UploadFileIcon from '@mui/icons-material/UploadFile'

interface iCreateSubtitle {
  storyId: string
  onClose: (subtitle?: SubtitleType) => void
}

const CreateSubtitle: React.FC<iCreateSubtitle> = ({ storyId, onClose }) => {
  const { actions: snackActions } = useContext(SimpleSnackbarContext)
  const [file, setFile] = useState<File | null>(null)

  const handleClose = (subtitle?: SubtitleType) => {
    onClose(subtitle)
  }

  const onSubmit = async ({ language }: FormikValues) => {
    try {
      const subtitle = await api.uploadSubtitle(storyId, language, file!)
      snackActions.open(`${subtitle.language} added to this story!`)
      handleClose(subtitle)
    } catch (error) {
      // @ts-ignore
      const { data } = error
      if (data.code) {
        snackActions.open(`Error to add ${language} to this story!`)
        return
      }
      snackActions.open('Something was wrong! please try again.')
    }
  }

  const initialValues: { language: LanguageEnum | null } = {
    language: null
  }

  const { isSubmitting, values, handleBlur, handleChange, touched, errors, handleSubmit } = useFormik({
    initialValues,
    validationSchema: schema,
    onSubmit
  })

  const onDrop: <T extends File>(acceptedFiles: T[], subtitleRejections: FileRejection[], event: DropEvent) => void =
    async acceptedFiles => {
      console.log('subtitleDropFile:', acceptedFiles, acceptedFiles[0])
      setFile(acceptedFiles[0])
    }

  return (
    <form>
      <Dialog
        fullWidth
        maxWidth="sm"
        onClose={(event, reason) => {
          if (reason !== 'backdropClick') {
            handleClose()
          }
        }}
        open={true}
      >
        <DialogTitle>
          Create subtitle
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
          <Typography sx={{ marginBottom: 3 }} gutterBottom>
            Add subtitles to allow users to view stories in different languages
          </Typography>
          <TextField
            autoFocus
            select
            name="language"
            fullWidth
            label="Language"
            placeholder="Select a language for subtitle"
            type="text"
            value={values.language}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.language && Boolean(errors.language)}
            helperText={(touched.language && errors.language) || ' '}
          >
            {Object.values(LanguageEnum).map(option => (
              <MenuItem key={option} value={option}>
                {option.charAt(0).toUpperCase() + option.slice(1)}
              </MenuItem>
            ))}
          </TextField>
          {file && (
            <Box
              sx={{
                display: 'flex',
                flexFlow: 'column'
              }}
            >
              <Box
                component="div"
                sx={{
                  height: 422,
                  display: 'flex',
                  flexFlow: 'column',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <Box
                  sx={{
                    width: 72,
                    height: 72,
                    borderRadius: 50,
                    backgroundColor: 'primary.main',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginBottom: 2
                  }}
                >
                  <UploadFileIcon
                    sx={{
                      fontSize: 52,
                      color: 'common.black'
                    }}
                  />
                </Box>
                <Typography fontWeight="700" align="center" variant="h5" gutterBottom>
                  {file.name}
                </Typography>
                <Button
                  onClick={() => {
                    setFile(null)
                  }}
                >
                  Remove
                </Button>
              </Box>
            </Box>
          )}
          {!file && (
            <Dropzone noClick multiple={false} accept="text/vtt" onDrop={onDrop}>
              {({ getRootProps, getInputProps, open }) => (
                <Box
                  sx={{
                    width: '100%',
                    paddingTop: 10,
                    height: 422,
                    border: '1px dashed #7b7b7c',
                    borderRadius: '20px'
                  }}
                >
                  <Box
                    sx={{
                      width: '100%',
                      height: '100%'
                    }}
                    {...getRootProps()}
                  >
                    <input {...getInputProps()} />
                    <Box
                      sx={{
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        flexFlow: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: '0px 85px'
                      }}
                    >
                      <Box
                        sx={{
                          width: 72,
                          height: 72,
                          borderRadius: 50,
                          backgroundColor: 'primary.main',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          marginBottom: 2
                        }}
                      >
                        <FileUploadIcon
                          sx={{
                            fontSize: 52,
                            color: 'common.black'
                          }}
                        />
                      </Box>
                      <Typography fontWeight="700" align="center" variant="h6" gutterBottom>
                        Drag and drop a subtitle file here
                      </Typography>
                      <Typography fontWeight="700" align="center" variant="h6" gutterBottom>
                        or
                      </Typography>
                      <Button size="large" onClick={open} variant="outlined">
                        Choose file
                      </Button>
                      <Typography fontWeight="700" variant="caption" marginTop={2} gutterBottom>
                        note: only{' '}
                        <Link href="https://developer.mozilla.org/en-US/docs/Web/API/WebVTT_API" target="_blank">
                          WebVTT
                        </Link>{' '}
                        files will be accepted
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              )}
            </Dropzone>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose()} sx={{ mt: 1, mr: 1 }}>
            Cancel
          </Button>
          <LoadingButton
            loading={isSubmitting}
            variant="contained"
            disabled={!file}
            onClick={() => handleSubmit()}
            sx={{ mt: 1, mr: 1 }}
          >
            Create
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </form>
  )
}

export default CreateSubtitle
