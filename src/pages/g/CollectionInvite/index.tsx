import React, { useCallback, useContext, useEffect, useState } from 'react'
import { parse } from 'qs'
import { useLocation, useParams, useHistory } from 'react-router-dom'
import api from '../../../lib/api'
import { InviteType } from '../../../lib/types'
import Typography from '@mui/material/Typography'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import Box from '@mui/material/Box'
import MobileStepper from '@mui/material/MobileStepper'
import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'
import LoadingButton from '@mui/lab/LoadingButton'

import Step1 from './steps/Step1'
import Step2 from './steps/Step2'
import Step3 from './steps/Step3'
import Step4 from './steps/Step4'
import CircularLoadingCentred from '../../../components/CircularLoadingCentred'
import { useFormik, FormikValues, FormikProvider } from 'formik'
import schema from './schema'
import { SimpleSnackbarContext } from '../../../components/SimpleSnackbar'
import { GuestLayoutContext } from '../GuestLayout'

const CollectionInvite: React.FC = () => {
  const location = useLocation()
  const { id } = useParams<{ id: string }>()
  const [token, setToken] = useState<string>('')
  const [invite, setInvite] = useState<InviteType | null>(null)
  const [activeStep, setActiveStep] = useState(0)
  const [progress, setProgress] = useState(0)
  const [loading, setLoading] = useState(true)
  const { actions: snackActions } = useContext(SimpleSnackbarContext)
  const { setLogo, setIsloading: setIsLoadingHeader } = useContext(GuestLayoutContext)
  const history = useHistory()

  const allowFirsStep = !!invite?.description || !!invite?.video
  const steps = allowFirsStep
    ? [
        { id: 'initial', label: '', error: false },
        { id: 'greenRoom', label: 'The green room', error: false },
        { id: 'submit', label: 'Submit your recording', error: false },
        { id: 'thankYoy', label: 'Thank you!', error: false }
      ]
    : [
        { id: 'greenRoom', label: 'The green room', error: false },
        { id: 'submit', label: 'Submit your recording', error: false },
        { id: 'thankYoy', label: 'Thank you!', error: false }
      ]

  const fetch = async () => {
    try {
      const inviteResult = await api.getInviteSubmission(id, token)
      if (inviteResult.organization) setLogo(inviteResult.organization.logo.url)
      setInvite(inviteResult)
      setIsLoadingHeader(false)
      setLoading(false)
      setActiveStep(0)
    } catch (e) {
      snackActions.open('This link was expired.')
      history.push('u/signin')
    }
  }

  useEffect(() => {
    const { token } = parse(location?.search as string, {
      ignoreQueryPrefix: true
    })
    setToken(token as string)
  }, [location])

  useEffect(() => {
    if (token) {
      fetch()
    }
  }, [token])

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1)
  }

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1)
  }

  const initialValues: {
    file: File | null
    name: string
    email: string
    allowEmail: boolean
    allowShareInfo: boolean
  } = {
    file: null,
    name: '',
    email: '',
    allowEmail: true,
    allowShareInfo: false
  }

  const handleSubmit = async (values: FormikValues) => {
    await api.sendInviteSubmission(
      id,
      token,
      { name: values.name, email: values.email, allowEmail: values.allowEmail, allowShareInfo: values.allowShareInfo },
      values.file,
      event => {
        const progress = Math.round((event.loaded * 100) / event.total)
        setProgress(progress)
      }
    )
    setProgress(0)
    handleNext()
  }

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: schema,
    validateOnBlur: true,
    validateOnMount: true,
    onSubmit: handleSubmit
  })

  const buttons = useCallback(
    ({ size = 'large' }: { size: 'small' | 'medium' | 'large' }) => (
      <ButtonGroup>
        {activeStep > 0 ? (
          <Button size={size} sx={{ fontSize: '1.2em' }} onClick={handleBack}>
            Back
          </Button>
        ) : (
          <div></div>
        )}
        <LoadingButton
          sx={{ fontSize: '1.2em' }}
          loading={steps[activeStep].id === 'submit' ? formik.isSubmitting : undefined}
          disabled={steps[activeStep].id === 'submit' ? !formik.isValid : undefined}
          onClick={() => {
            if (steps[activeStep].id === 'submit') {
              formik.handleSubmit()
              return
            }
            handleNext()
          }}
          variant="contained"
          size={size}
        >
          {steps[activeStep].id === 'submit' ? 'Submit' : 'Next'}
        </LoadingButton>
      </ButtonGroup>
    ),
    [formik, activeStep, steps]
  )

  if (loading) return <CircularLoadingCentred />

  return (
    <>
      <Box sx={{ width: '100%', paddingY: 5, paddingX: 2 }}>
        <Stepper sx={{ display: { xs: 'none', md: 'flex' } }} activeStep={activeStep} alternativeLabel>
          {steps.map(item => (
            <Step key={item.label}>
              <StepLabel error={item.error}>{item.label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <Box sx={{ display: { md: 'none' }, textAlign: 'center' }}>
          <Typography variant="h5">{steps[activeStep].label}</Typography>
        </Box>
      </Box>
      <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
        <Box sx={{ width: '100%', maxWidth: 1080, paddingX: { xs: 3, md: 2 } }}>
          <FormikProvider value={formik}>
            {allowFirsStep ? (
              <>
                {activeStep === 0 && <Step1 invite={invite!} />}
                {activeStep === 1 && <Step2 invite={invite!} handleNext={handleNext} />}
                {activeStep === 2 && <Step3 invite={invite!} progress={progress} />}
                {activeStep === 3 && <Step4 invite={invite!} />}
              </>
            ) : (
              <>
                {activeStep === 0 && <Step2 invite={invite!} handleNext={handleNext} />}
                {activeStep === 1 && <Step3 invite={invite!} progress={progress} />}
                {activeStep === 2 && <Step4 invite={invite!} />}
              </>
            )}
          </FormikProvider>
        </Box>
      </Box>
      {(allowFirsStep ? activeStep !== 3 : activeStep !== 2) && (
        <>
          <MobileStepper
            sx={{ display: { xs: 'flex', md: 'none' }, width: '100%', position: 'fixed', bottom: 0, zIndex: 11 }}
            steps={steps.length}
            position="static"
            activeStep={activeStep}
            backButton={<div />}
            nextButton={
              <Box sx={{ position: 'relative', height: '57px' }}>
                <Box sx={{ position: 'absolute', right: 0 }}>{buttons({ size: 'medium' })}</Box>
              </Box>
            }
          />
          <Box
            sx={{
              display: { xs: 'none', md: 'flex' },
              width: '100%',
              position: 'fixed',
              bottom: 24,
              right: 24,
              zIndex: 11
            }}
          >
            <Box sx={{ flex: 1 }} />
            {buttons({ size: 'large' })}
          </Box>
        </>
      )}
    </>
  )
}

export default CollectionInvite
