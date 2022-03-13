import React, { useContext, useEffect, useState } from 'react'
import { parse } from 'qs'
import { useLocation, useParams, useHistory } from 'react-router-dom'
import api from '../../../lib/api'
import { InviteContributorType } from '../../../lib/types'
import Typography from '@mui/material/Typography'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import Box from '@mui/material/Box'
import MobileStepper from '@mui/material/MobileStepper'
import Button, { ButtonProps } from '@mui/material/Button'
import LoadingButton from '@mui/lab/LoadingButton'
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft'
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight'
import Step1 from './steps/Step1'
import Step2 from './steps/Step2'
import Step3 from './steps/Step3'
import Step4 from './steps/Step4'
import CircularLoadingCentred from '../../../components/CircularLoadingCentred'
import { useFormik, FormikValues, FormikProvider } from 'formik'
import schema from './schema'
import { SimpleSnackbarContext } from '../../../components/SimpleSnackbar'

const ContributorInvite: React.FC = () => {
  const location = useLocation()
  const { id } = useParams<{ id: string }>()
  const [token, setToken] = useState<string>('')
  const [invite, setInvite] = useState<InviteContributorType | null>(null)
  const [activeStep, setActiveStep] = useState(0)
  const [progress, setProgress] = useState(0)
  const [loading, setLoading] = useState(true)
  const { actions: snackActions } = useContext(SimpleSnackbarContext)
  const history = useHistory()

  const fetch = async () => {
    try {
      const inviteResult = await api.getContributorInviteSubmission(id, token)
      setInvite(inviteResult)
      setLoading(false)
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
    files: File[] | null
    name: string
    email: string
  } = {
    files: null,
    name: '',
    email: ''
  }

  const handleSubmit = async (values: FormikValues) => {
    await api.sendContributorInviteSubmission(
      id,
      token,
      { name: values.name, email: values.email },
      values!.files,
      event => {
        const progress = Math.round((event.loaded * 100) / event.total)
        console.log(progress)
      }
    )
    handleNext()
  }

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: schema,
    validateOnBlur: true,
    onSubmit: handleSubmit
  })

  const steps = [
    { label: 'Contribution request', error: false },
    { label: 'The green room', error: false },
    { label: 'Submit your contribution', error: false },
    { label: 'Thank you!', error: false }
  ]

  const ButtonBack: React.FC<ButtonProps> = props => {
    if (activeStep !== 0) {
      return (
        <Button {...props} onClick={handleBack}>
          Back
        </Button>
      )
    }

    return <div></div>
  }

  const ButtonNext: React.FC<ButtonProps> = props => {
    if (activeStep === 2) {
      return (
        <LoadingButton
          {...props}
          loading={formik.isSubmitting}
          disabled={!formik.isValid}
          onClick={() => {
            formik.handleSubmit()
          }}
        >
          Submit
        </LoadingButton>
      )
    }
    return (
      <Button {...props} onClick={handleNext}>
        Next
      </Button>
    )
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
            {activeStep === 1 && <Step2 invite={invite!} />}
            {activeStep === 2 && <Step3 invite={invite!} progress={progress} />}
            {activeStep === 3 && <Step4 invite={invite!} />}
          </FormikProvider>
        </Box>
      </Box>
      {activeStep !== 3 && (
        <>
          <MobileStepper
            sx={{ display: { xs: 'flex', md: 'none' }, width: '100%', position: 'fixed', bottom: 0 }}
            steps={steps.length}
            position="static"
            activeStep={activeStep}
            backButton={<ButtonBack size="large" startIcon={<KeyboardArrowLeft />} />}
            nextButton={<ButtonNext size="large" endIcon={activeStep < 2 && <KeyboardArrowRight />} />}
          />
          <Box sx={{ display: { xs: 'none', md: 'flex' }, width: '100%', position: 'fixed', bottom: 24, right: 24 }}>
            <div style={{ flex: 1 }} />
            <ButtonBack size="large" />
            <Box sx={{ marginX: 1 }} />
            <ButtonNext size="large" variant="contained" />
          </Box>
        </>
      )}
    </>
  )
}

export default ContributorInvite
