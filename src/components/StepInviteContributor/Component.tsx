import React, { useState, useContext, useEffect } from 'react'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Box from '@mui/material/Box'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import { useFormik, FormikValues, FormikProvider } from 'formik'
import { StepInviteContributorContext } from './Context'
import { schema, schemaStep4 } from './schema'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import { SimpleSnackbarContext } from '../SimpleSnackbar'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'
import Step2 from './steps/step2'
import Step1 from './steps/step1'
import { InviteContributorType, InviteType } from '../../lib/types'
import { addDays } from 'date-fns'
import api from '../../lib/api'
import LoadingButton from '@mui/lab/LoadingButton'

const StepInviteContributor: React.FC<{ storyId: string }> = ({ storyId }) => {
  const { actions } = useContext(StepInviteContributorContext)
  const { actions: snackActions } = useContext(SimpleSnackbarContext)
  const [invite, setInvite] = useState<InviteContributorType | null>(null)
  const [activeStep, setActiveStep] = useState(0)
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'))

  const initialValuesStep4: {
    email: string
    emails: { email: string; name: string }[]
  } = {
    emails: [],
    email: ''
  }

  const initialValues: {
    title: string
    instructions: string
    recordingType: 'FILE' | 'GALLERY_ENTRY' | 'NONE'
    expire: Date
    allowExpire: boolean
  } = {
    title: '',
    instructions: '',
    recordingType: 'NONE',
    expire: addDays(new Date(), 7),
    allowExpire: false
  }

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1)
  }

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1)
  }

  const generateLink = async (values: FormikValues) => {
    try {
      const invite = await api.createContributorInvite({
        storyId,
        dueAt: values.allowExpire ? values!.expire : null,
        title: values.title,
        description: values.instructions,
        requestedMediaType: values.recordingType === 'NONE' ? null : values.recordingType
      })
      setInvite(invite)
      handleNext()
    } catch (e) {
      console.error(e)
    }
  }

  const sendEmails = async (values: FormikValues) => {
    try {
      if (values.emails.length) {
        await api.sendInviteContributorEmails(
          invite!.id,
          (values.emails as { email: string; name: string }[]).reduce<{ [key: string]: string }>((acc, value) => {
            acc[value.email] = value.name
            return acc
          }, {})
        )
        snackActions.open(`An email has been sent to contributors that are invited.`)
      }
      actions.close()
    } catch (e) {
      console.error(e)
    }
  }

  const handleChooseForm = (values: FormikValues) => {
    if (activeStep === 0) {
      generateLink(values)
    }
    if (activeStep === 1) {
      sendEmails(values)
    }
  }

  const formikStep4 = useFormik({
    initialValues: initialValuesStep4,
    validationSchema: schemaStep4,
    validateOnBlur: true,
    onSubmit: handleChooseForm
  })

  const formik = useFormik({
    initialValues,
    validationSchema: schema,
    validateOnBlur: true,
    onSubmit: handleChooseForm
  })

  useEffect(() => {
    setActiveStep(0)
    formik.handleReset(initialValues)
  }, [])

  const steps = [
    { label: 'Describe and configure', error: false },
    { label: 'Share', error: false }
  ]

  return (
    <form>
      <Dialog
        fullScreen={fullScreen}
        fullWidth
        maxWidth="md"
        onClose={(event, reason) => {
          if (reason !== 'backdropClick') {
            actions.close()
          }
        }}
        open
      >
        <DialogTitle>
          Invite contributor
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
          <Box sx={{ width: '100%', marginY: 3, minHeight: 328 }}>
            <FormikProvider value={formik}>{activeStep === 0 && <Step1 />}</FormikProvider>
            <FormikProvider value={formikStep4}>{activeStep === 1 && <Step2 url={invite!.url} />}</FormikProvider>
          </Box>
        </DialogContent>
        <DialogActions>
          {activeStep === 1 && (
            <LoadingButton
              variant="contained"
              loading={formikStep4.isSubmitting}
              disabled={!formikStep4.isValid}
              onClick={() => formikStep4.handleSubmit()}
              sx={{ mt: 1, mr: 1 }}
            >
              Share and close
            </LoadingButton>
          )}
          {activeStep === 0 && (
            <LoadingButton
              variant="contained"
              loading={formik.isSubmitting}
              disabled={!formik.isValid}
              onClick={() => formik.handleSubmit()}
              sx={{ mt: 1, mr: 1 }}
            >
              Generate
            </LoadingButton>
          )}
        </DialogActions>
      </Dialog>
    </form>
  )
}

export default StepInviteContributor
