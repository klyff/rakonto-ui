import React, { useState, useContext, useEffect } from 'react'
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
import IconButton from '@mui/material/IconButton'
import Recorder from './Recorder'
import CloseIcon from '@mui/icons-material/Close'
import { QueueProcessorContext } from '../QueueProcessor'

const StepStoryUpload = () => {
  const { actions: queueActions } = useContext(QueueProcessorContext)
  const { store, actions } = useContext(StepStoryUploadContext)
  const [progress, setProgress] = useState<number>(0)
  const [sending, setSending] = useState<boolean>(false)
  const [activeStep, setActiveStep] = useState(0)
  const [uploadType, setUploadType] = useState<'FILE' | 'RECORDER' | undefined>()

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1)
  }

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1)
  }

  const onSubmit = async (values: FormikValues) => {
    try {
      await queueActions.addProcessor({
        id: Date.now().toString(),
        step: 'UPLOAD',
        type: 'FILE',
        title: values.title,
        description: values.description,
        file: values.file
      })
      actions.close()
    } catch (e) {
      console.error(e)
    }
  }

  const initialValues: { title: string; description: string; file: File | null } = {
    title: '',
    description: '',
    file: null
  }

  const { isSubmitting, setFieldValue, values, handleBlur, handleChange, touched, errors, handleSubmit, handleReset } =
    useFormik({
      initialValues,
      validationSchema: schema,
      onSubmit
    })

  useEffect(() => {
    if (store.isOpen) {
      setSending(false)
      setActiveStep(0)
      setProgress(0)
      setUploadType(undefined)
      handleReset(initialValues)
    }
  }, [store.isOpen])

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
                You`re all set! You can now upload or record your story (audio or video).
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center'
                }}
              >
                <>
                  {(uploadType === 'FILE' || !uploadType) && (
                    <Droparea
                      file={values.file}
                      onDrop={acceptedFiles => {
                        const file = acceptedFiles[0]
                        setFieldValue('file', file)
                        setUploadType('FILE')
                      }}
                      onRemove={() => {
                        setFieldValue('file', null)
                        setUploadType(undefined)
                      }}
                    />
                  )}
                  {uploadType === 'RECORDER' || (!uploadType && <Recorder />)}
                </>
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
