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
import { useFormik, FormikValues, FormikProvider } from 'formik'
import { StepInviteRecorderContext } from './Context'
import { schema, schemaStep4 } from './schema'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import { SimpleSnackbarContext } from '../SimpleSnackbar'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'
import Step4 from './steps/step4'
import Step2 from './steps/step2'
import Step3 from './steps/step3'
import Step1 from './steps/step1'
import { InviteType, MediaType, CollectionType } from '../../lib/types'
import { addDays } from 'date-fns'
import api from '../../lib/api'
import LoadingButton from '@mui/lab/LoadingButton'
import { useMitt } from 'react-mitt'
import useUser from '../UserProvider/useUser'

const StepInviteRecorder: React.FC<{ initialCollection: CollectionType | null }> = ({ initialCollection }) => {
  const { user } = useUser()
  const { actions } = useContext(StepInviteRecorderContext)
  const { actions: snackActions } = useContext(SimpleSnackbarContext)
  const [selectedSuggestion, setSelectedSuggestion] = useState<string>('')
  const [invite, setInvite] = useState<InviteType | null>(null)
  const [activeStep, setActiveStep] = useState(0)
  const [progress, setProgress] = useState(0)
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'))
  const [loading, setLoading] = useState<boolean>(false)
  const { emitter } = useMitt()

  useEffect(() => {
    !!invite?.video &&
      emitter.on('story-media-success', event => {
        const { payload: data } = JSON.parse(event.data)
        if (data.id === invite!.id) {
          setLoading(false)
        }
      })
  }, [invite])

  const initialValuesStep4: {
    email: string
    emails: { email: string; name: string }[]
  } = {
    emails: [],
    email: ''
  }

  const initialValues: {
    collection: CollectionType | null
    instructions: string
    file: File | null
    recordingType: MediaType | 'NONE'
    expire: Date
    size: string
    title: string
    allowExpire: boolean
    allowOrganization: boolean
    callToActionInstructions: string
    callToActionButtonLabel: string
    callToAction: string
  } = {
    collection: initialCollection,
    instructions: '',
    file: null,
    recordingType: 'NONE',
    expire: addDays(new Date(), 7),
    size: '10',
    title: '',
    allowExpire: false,
    allowOrganization: false,
    callToActionInstructions: '',
    callToActionButtonLabel: '',
    callToAction: ''
  }

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1)
  }

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1)
  }

  const generateLink = async (values: FormikValues) => {
    try {
      const inviteResult = await api.createInvite(
        {
          collectionId: values!.collection!.id,
          organizationId: values.allowOrganization ? user.organizations[0].id : null,
          title: values!.title,
          description: values!.instructions,
          dueAt: values.allowExpire ? values!.expire : null,
          requestedMediaLength: Number(values!.size),
          requestedMediaType: values.recordingType === 'NONE' ? null : values.recordingType,
          callToActionInstructions: values?.callToActionInstructions,
          callToActionButtonLabel: values?.callToActionButtonLabel,
          callToAction: values?.callToAction
        },
        values.file,
        event => {
          setProgress(Math.round((event.loaded * 100) / event.total))
        }
      )
      setInvite(inviteResult)
      setProgress(0)
      setLoading(!!inviteResult.video)
      handleNext()
    } catch (e) {
      console.error(e)
    }
  }

  const sendEmails = async (values: FormikValues) => {
    try {
      if (values.emails.length) {
        await api.sendInviteEmails(
          invite!.id,
          (values.emails as { email: string; name: string }[]).reduce<{ [key: string]: string }>((acc, value) => {
            acc[value.email] = value.name
            return acc
          }, {})
        )
        snackActions.open(`An email has been sent to recorders that are invited.`)
      }
      actions.close()
    } catch (e) {
      console.error(e)
    }
  }

  const handleChooseForm = (values: FormikValues) => {
    if (activeStep === 2) {
      generateLink(values)
    }
    if (activeStep === 3) {
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

  const { isSubmitting, setFieldValue, touched, errors, handleReset } = formik

  useEffect(() => {
    setActiveStep(0)
    handleReset(initialValues)
  }, [])

  const steps = [
    { label: 'Choose collection', error: touched.collection && Boolean(errors.collection) },
    { label: 'Describe', error: touched.instructions && Boolean(errors.instructions) },
    { label: 'Configure', error: false },
    { label: 'Share', error: false }
  ]

  useEffect(() => {
    if (!selectedSuggestion) return
    setFieldValue('title', selectedSuggestion)
    setSelectedSuggestion('')
  }, [selectedSuggestion])
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
          Invite recorders
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
            <FormikProvider value={formik}>
              {activeStep === 0 && <Step1 allowSelectCollection={!initialValues.collection} />}
              {activeStep === 1 && <Step2 />}
              {activeStep === 2 && <Step3 progress={progress} />}
            </FormikProvider>
            <FormikProvider value={formikStep4}>
              {activeStep === 3 && <Step4 loading={loading} url={invite!.url} />}
            </FormikProvider>
          </Box>
        </DialogContent>
        <DialogActions>
          {activeStep > 0 && activeStep < 3 && (
            <Button disabled={isSubmitting} onClick={handleBack} sx={{ mt: 1, mr: 1 }}>
              {'Back'}
            </Button>
          )}
          {activeStep === 3 && (
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
          {activeStep === 2 && (
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
          {activeStep < 2 && (
            <Button variant="contained" onClick={handleNext} sx={{ mt: 1, mr: 1 }}>
              Next
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </form>
  )
}

export default StepInviteRecorder
