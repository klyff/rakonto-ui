import React, { useContext, useEffect, useState } from 'react'
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
import Button, { ButtonProps } from '@mui/material/Button'
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

const ButtonNext: React.FC<
  ButtonProps & { label: string; loading: boolean | undefined; disabled: boolean | undefined }
> = ({ label, loading, disabled, onClick, ...props }) => {
  return (
    <LoadingButton {...props} sx={{ fontSize: '1.2em' }} loading={loading} disabled={disabled} onClick={onClick}>
      {label}
    </LoadingButton>
  )
}

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

  const steps = [
    { id: 0, label: '', error: false, allow: !!invite?.description || !!invite?.video },
    { id: 1, label: 'The green room', error: false, allow: true },
    { id: 2, label: 'Submit your recording', error: false, allow: true },
    { id: 3, label: 'Thank you!', error: false, allow: true }
  ].filter(item => item.allow)

  const fetch = async () => {
    try {
      const inviteResult = await api.getInviteSubmission(id, token)
      if (inviteResult.organization) setLogo(inviteResult.organization.logo.url)
      setInvite(inviteResult)
      setIsLoadingHeader(false)
      setLoading(false)
      setActiveStep(!!inviteResult?.description || !!inviteResult?.video ? 0 : 1)
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
    handleNext()
    setProgress(0)
  }

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: schema,
    validateOnBlur: true,
    onSubmit: handleSubmit
  })

  const ButtonBack: React.FC<ButtonProps> = props => {
    if (activeStep > (!!invite?.description || !!invite?.video ? 0 : 1)) {
      return (
        <Button {...props} sx={{ fontSize: '1.2em' }} onClick={handleBack}>
          Back
        </Button>
      )
    }

    return <div></div>
  }

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
            {activeStep === 0 && <Step1 invite={invite!} />}
            {activeStep === 1 && <Step2 invite={invite!} handleNext={handleNext} />}
            {activeStep === 2 && <Step3 invite={invite!} progress={progress} />}
            {activeStep === 3 && <Step4 invite={invite!} />}
          </FormikProvider>
        </Box>
      </Box>
      {activeStep !== 3 && (
        <>
          <MobileStepper
            sx={{ display: { xs: 'flex', md: 'none' }, width: '100%', position: 'fixed', bottom: 0, zIndex: 11 }}
            steps={steps.length}
            position="static"
            activeStep={activeStep}
            backButton={<ButtonBack size="large" />}
            nextButton={
              <ButtonNext
                label={activeStep === 2 ? 'Submit' : 'Next'}
                loading={activeStep === 2 ? formik.isSubmitting : undefined}
                disabled={activeStep === 2 ? !formik.isValid : undefined}
                onClick={() => {
                  if (activeStep === 2) {
                    formik.handleSubmit()
                    return
                  }
                  handleNext()
                }}
                variant="contained"
                size="large"
              />
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
            <div style={{ flex: 1 }} />
            <ButtonBack size="large" />
            <Box sx={{ marginX: 1 }} />
            <ButtonNext
              label={activeStep === 2 ? 'Submit' : 'Next'}
              loading={activeStep === 2 ? formik.isSubmitting : undefined}
              disabled={activeStep === 2 ? !formik.isValid : undefined}
              onClick={() => {
                if (activeStep === 2) {
                  formik.handleSubmit()
                  return
                }
                handleNext()
              }}
              size="large"
              variant="contained"
            />
          </Box>
        </>
      )}
    </>
  )
}

export default CollectionInvite
