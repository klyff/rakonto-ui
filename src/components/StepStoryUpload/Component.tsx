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
import MenuItem from '@mui/material/MenuItem'
import schema from './schema'
import Droparea from './Droparea'
import IconButton from '@mui/material/IconButton'
import Recorder from './Recorder'
import CloseIcon from '@mui/icons-material/Close'
import { QueueProcessorContext } from '../QueueProcessor'
import { SimpleSnackbarContext } from '../SimpleSnackbar'
import suggestionList from './suggestionList.json'

const StepStoryUpload = () => {
  const { actions: queueActions } = useContext(QueueProcessorContext)
  const { store, actions } = useContext(StepStoryUploadContext)
  const { actions: snackActions } = useContext(SimpleSnackbarContext)
  const [selectedSuggestion, setSelectedSuggestion] = useState<string>('')
  const [activeStep, setActiveStep] = useState(0)
  const [uploadType, setUploadType] = useState<'FILE' | 'AUDIO' | 'VIDEO' | null>(null)

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
        action: 'NEW',
        title: values.title,
        description: values.description,
        file: values.file
      })
      snackActions.open(
        `Rakonto is now uploading and processing your story. It may take a while. We'll send you an email when it's completed.`
      )
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

  const {
    isSubmitting,
    setFieldValue,
    values,
    handleBlur,
    isValid,
    handleChange,
    touched,
    errors,
    handleSubmit,
    handleReset
  } = useFormik({
    initialValues,
    validationSchema: schema,
    onSubmit
  })

  useEffect(() => {
    if (store.isOpen) {
      setActiveStep(0)
      setUploadType(null)
      handleReset(initialValues)
    }
  }, [store.isOpen])

  const steps = [
    { label: 'Story title', error: touched.title && Boolean(errors.title) },
    { label: 'Description', error: touched.description && Boolean(errors.description) },
    { label: 'Upload', error: Boolean(errors.file) }
  ]

  useEffect(() => {
    if (!selectedSuggestion) return
    setFieldValue('title', selectedSuggestion)
    setSelectedSuggestion('')
  }, [selectedSuggestion])

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
              <Typography variant="body1" fontWeight="400" marginBottom={3} paddingLeft={'14px'} gutterBottom>
                Rakonto makes it easy to record and share your stories.
              </Typography>
              <Typography variant="body1" fontWeight="600" paddingLeft={'14px'} gutterBottom>
                First, give your story a title (and don&lsquo;t worry, you can always change it later)
              </Typography>
              <TextField
                autoFocus
                key={'title'}
                name={'title'}
                fullWidth
                margin="dense"
                placeholder="Type your Story title here (Rakonto may offer suggestions based on what you type)"
                onBlur={handleBlur}
                value={values.title}
                onChange={handleChange}
                error={touched.title && Boolean(errors.title)}
                helperText={(touched.title && errors.title) || ' '}
              />
              <Box
                sx={{
                  display: 'flex'
                }}
              >
                <Box
                  sx={{
                    width: '230px',
                    height: '128px',
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: '6px',
                    padding: 2,
                    mr: 2,
                    display: 'flex',
                    flexFlow: 'column',
                    justifyContent: 'space-around'
                  }}
                >
                  <Typography variant="body1" gutterBottom>
                    Do you want a suggestion for your title?
                  </Typography>
                  <TextField
                    select
                    size="small"
                    label="Select a suggestion"
                    value={selectedSuggestion}
                    onChange={e => setSelectedSuggestion(e.target.value)}
                    fullWidth
                  >
                    {suggestionList.map(option => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </TextField>
                </Box>
                <Box
                  sx={{
                    width: '230px',
                    height: '128px',
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: '6px',
                    padding: 2,
                    display: 'flex',
                    flexFlow: 'column',
                    justifyContent: 'space-around'
                  }}
                >
                  <Typography variant="body1" gutterBottom>
                    Watch a video tutorial recording.
                  </Typography>
                  <Button href="https://youtu.be/jFivHCW414k" target="_blank" variant="outlined" sx={{ mt: 1, mr: 1 }}>
                    {'Watch'}
                  </Button>
                </Box>
              </Box>
            </Box>
          )}
          {activeStep === 1 && (
            <Box sx={{ width: '100%' }}>
              <Typography variant="body1" paddingLeft={'14px'} fontWeight="400" marginBottom={3} gutterBottom>
                Okay, just one more question before you start recording. Remember, you can change this information at
                any time.
              </Typography>
              <Typography variant="body1" fontWeight="600" paddingLeft={'14px'} gutterBottom>
                What is this story about (in just one or a few sentences)?
              </Typography>
              <TextField
                autoFocus
                key={'description'}
                name={'description'}
                fullWidth
                multiline
                rows={4}
                placeholder="Type your description here..."
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
                        setUploadType(null)
                      }}
                    />
                  )}
                  {(uploadType === 'AUDIO' || uploadType === 'VIDEO' || !uploadType) && (
                    <Recorder
                      type={uploadType}
                      onDrop={file => {
                        setFieldValue('file', file)
                      }}
                      onSelected={(value: 'AUDIO' | 'VIDEO' | null) => {
                        setUploadType(value)
                      }}
                    />
                  )}
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
            <Button
              variant="contained"
              disabled={isSubmitting || !values.file || !isValid}
              onClick={() => handleSubmit()}
              sx={{ mt: 1, mr: 1 }}
            >
              Save
            </Button>
          ) : (
            <Button variant="contained" onClick={handleNext} sx={{ mt: 1, mr: 1 }}>
              Next
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </form>
  )
}

export default StepStoryUpload
