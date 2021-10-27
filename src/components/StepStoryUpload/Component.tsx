import React, { useState, useContext } from 'react'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import { useFormik, FormikValues } from 'formik'
import { StepStoryUploadContext } from './Context'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import schema from './schema'
import Droparea from './Droparea'
import { ApiContext } from '../../lib/api'
import { CircularProgress } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'

const StepStoryUpload = () => {
  const { api } = useContext(ApiContext)
  const { store, actions } = useContext(StepStoryUploadContext)
  const [progress, setProgress] = useState<number>(0)
  const [sending, setSending] = useState<boolean>(false)
  const [activeStep, setActiveStep] = useState(0)

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1)
  }

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1)
  }

  const onSubmit = async (values: FormikValues) => {
    try {
      setSending(true)
      await api().createStory(
        values.file,
        {
          title: values.title,
          description: values.description
        },
        event => {
          const progress = Math.round((event.loaded * 100) / event.total)
          setProgress(progress)
        }
      )
      actions.close()
    } catch (e) {
      console.error(e)
    }
  }

  const initialValues = { title: '', description: '', file: null }

  const { isSubmitting, setFieldValue, values, handleBlur, handleChange, touched, errors, handleSubmit } = useFormik({
    initialValues,
    validationSchema: schema,
    onSubmit
  })

  const steps = [
    { label: 'Story title', error: touched.title && Boolean(errors.title) },
    { label: 'Description', error: touched.description && Boolean(errors.description) },
    { label: 'Upload', error: false }
  ]

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
          New story
          <IconButton
            aria-label="close"
            onClick={actions.close}
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
          <Box sx={{ width: '100%', marginBottom: 2 }}>
            <Stepper activeStep={activeStep} alternativeLabel>
              {steps.map(item => (
                <Step key={item.label}>
                  <StepLabel error={item.error}>{item.label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </Box>
          {activeStep === 0 && (
            <Box sx={{ width: '100%' }}>
              <Typography variant="body1" align="center" fontWeight="400" marginBottom={3} gutterBottom>
                Rakonto makes it easy to record and share your stories. And if you have more questions and need help,
                we’re here for you!
              </Typography>
              <Typography variant="body1" fontWeight="600" paddingLeft={5} gutterBottom>
                What is your story called?
              </Typography>
              <TextField
                key={'title'}
                name={'title'}
                fullWidth
                margin="dense"
                placeholder="Click to select a Title or type your own Story title"
                onBlur={handleBlur}
                value={values.title}
                onChange={handleChange}
                error={touched.title && Boolean(errors.title)}
                helperText={(touched.title && errors.title) || ' '}
              />
            </Box>
          )}
          {activeStep === 1 && (
            <Box sx={{ width: '100%' }}>
              <Typography variant="body1" align="center" fontWeight="400" marginBottom={3} gutterBottom>
                Okay, just one more question before you start recording. You will can enter or edit this information
                after recording.
              </Typography>
              <Typography variant="body1" fontWeight="600" paddingLeft={5} gutterBottom>
                What is this story about (in just one or a few sentences)?
              </Typography>
              <TextField
                key={'description'}
                name={'description'}
                fullWidth
                multiline
                rows={4}
                placeholder="Type a description here..."
                margin="dense"
                value={values.description}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.description && Boolean(errors.description)}
                helperText={(touched.description && errors.description) || ' '}
              />
            </Box>
          )}
          {activeStep === 2 && (
            <Box sx={{ width: '100%' }}>
              <Typography align="center" variant="body2" fontWeight="400" marginBottom={3} gutterBottom>
                Now the time has come! You can record a video or audio. If you have recorded content, upload it.
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center'
                }}
              >
                {sending && (
                  <Box
                    sx={{
                      width: 422,
                      height: 422,
                      border: '1px solid #7b7b7c',
                      borderRadius: '20px',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}
                  >
                    <CircularProgress variant="determinate" value={progress} />
                  </Box>
                )}
                {!sending && (
                  <>
                    <Droparea
                      onDrop={acceptedFiles => {
                        const file = acceptedFiles[0]
                        setFieldValue(
                          'file',
                          file
                          // Object.assign(file, {
                          //   preview: URL.createObjectURL(file)
                          // })
                        )
                      }}
                    />
                    <Box sx={{ padding: '0 16px' }} />
                    <Box
                      sx={{
                        width: 422,
                        height: 422,
                        border: '1px solid #7b7b7c',
                        borderRadius: '20px'
                      }}
                    />
                  </>
                )}
              </Box>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          {activeStep > 0 && (
            <Button disabled={isSubmitting} onClick={handleBack} sx={{ mt: 1, mr: 1 }}>
              {'Back'}
            </Button>
          )}
          {activeStep === 2 ? (
            <Button variant="contained" disabled={isSubmitting} onClick={() => handleSubmit()} sx={{ mt: 1, mr: 1 }}>
              Finish
            </Button>
          ) : (
            <Button variant="contained" onClick={handleNext} sx={{ mt: 1, mr: 1 }}>
              Confirm
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </form>
  )
}

export default StepStoryUpload
