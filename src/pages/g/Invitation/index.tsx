import React, { useEffect, useState } from 'react'
import { parse } from 'qs'
import { useLocation, useParams } from 'react-router-dom'
import api from '../../../lib/api'
import { Invite } from '../../../lib/types'
import Typography from '@mui/material/Typography'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import Box from '@mui/material/Box'
import MobileStepper from '@mui/material/MobileStepper'
import Button from '@mui/material/Button'
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft'
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight'
import Step1 from './steps/Step1'
import Step2 from './steps/Step2'
import Step3 from './steps/Step3'
import Step4 from './steps/Step4'
import Step5 from './steps/Step5'

const Invitation: React.FC = () => {
  const location = useLocation()
  const { id } = useParams<{ id: string }>()
  const [token, setToken] = useState<string>('')
  const [invite, setInvite] = useState<Invite | null>(null)
  const [activeStep, setActiveStep] = useState(0)

  const fetch = async () => {
    try {
      const inviteResult = await api.getInviteSubmission(id, token)
      setInvite(inviteResult)
    } catch (e) {
      console.log(e)
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

  const steps = [
    { label: 'Story request' },
    { label: 'The green room' },
    { label: 'Save your recording' },
    { label: 'Submit your recording' },
    { label: 'Thank you!' }
  ]

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1)
  }

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1)
  }

  return (
    <Box sx={{ width: '100%', marginBottom: 2 }}>
      <Box sx={{ width: '100%', paddingY: 5, paddingX: 2 }}>
        <Stepper sx={{ display: { xs: 'none', md: 'flex' } }} activeStep={activeStep} alternativeLabel>
          {steps.map(item => (
            <Step key={item.label}>
              <StepLabel>{item.label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <Box sx={{ display: { md: 'none' }, textAlign: 'center' }}>
          <Typography variant="h5">{steps[activeStep].label}</Typography>
        </Box>
      </Box>
      <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
        <Box sx={{ width: '100%', maxWidth: 1080, paddingX: { xs: 3, md: 'unset' } }}>
          {activeStep === 0 && <Step1 invite={invite!} />}
          {activeStep === 1 && <Step2 invite={invite!} />}
          {activeStep === 2 && <Step3 invite={invite!} />}
          {activeStep === 3 && <Step4 invite={invite!} />}
          {activeStep === 4 && <Step5 invite={invite!} />}
        </Box>
      </Box>
      <MobileStepper
        sx={{ display: { xs: 'flex', md: 'none' }, width: '100%', position: 'fixed', bottom: 0 }}
        steps={steps.length}
        position="static"
        activeStep={activeStep}
        backButton={
          <>
            {activeStep !== 0 && (
              <Button size="small" onClick={handleBack}>
                <KeyboardArrowLeft />
                Back
              </Button>
            )}
            {activeStep === 0 && <div></div>}
          </>
        }
        nextButton={
          <Button size="small" onClick={handleNext}>
            Next
            <KeyboardArrowRight />
          </Button>
        }
      />
    </Box>
  )
}

export default Invitation
