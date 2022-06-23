import React from 'react'
import { InviteType } from '../../../../lib/types'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'
import TextField from '@mui/material/TextField'
import { useField } from 'formik'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'

const Step3: React.FC<{ invite: InviteType; progress: number }> = ({ invite, progress }) => {
  const [{ onChange: nameOnChange, onBlur: nameOnBlur, value: nameValue }, { error, touched }] = useField('name')
  const [
    { onChange: emailOnChange, onBlur: emailOnBlur, value: emailValue },
    { error: emailError, touched: emailTouched }
  ] = useField('email')
  const name = invite.organization?.name || `${invite.user.firstName} ${invite.user.lastName}`
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h6" mb={2}>
          {`Your recording is saved! Please enter your name and email so we can inform
          ${name} that you have submitted your recording, and that you authorize
          ${name} to contact you and share your submission in accordance with our `}
          <Link href="https://rakonto.io/terms-and-conditions" target="_blank">
            terms
          </Link>{' '}
          and{' '}
          <Link href=" https://rakonto.io/privacy-policy" target="_blank">
            {' '}
            privacy policy
          </Link>
          .
        </Typography>
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          label="Name"
          name="name"
          type="text"
          value={nameValue}
          onChange={nameOnChange}
          onBlur={nameOnBlur}
          error={touched && Boolean(error)}
          helperText={(touched && error) || ' '}
          fullWidth
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          label="Email"
          name="email"
          type="text"
          value={emailValue}
          onChange={emailOnChange}
          onBlur={emailOnBlur}
          error={emailTouched && Boolean(emailError)}
          helperText={(emailTouched && emailError) || ' '}
          fullWidth
        />
      </Grid>
      <Grid
        item
        xs={12}
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 10, flexFlow: 'column' }}
      >
        {!!progress && (
          <>
            <Box sx={{ position: 'relative', display: 'inline-flex' }}>
              <CircularProgress size={100} variant="determinate" value={progress || 100} />
              <Box
                sx={{
                  top: 0,
                  left: 0,
                  bottom: 0,
                  right: 0,
                  position: 'absolute',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Typography variant="h6" component="div" color="text.secondary">
                  {`${Math.round(progress || 100)}%`}
                </Typography>
              </Box>
            </Box>
            <Typography mt={2} variant="h6" component="div" color="text.secondary">
              uploading the story...
            </Typography>
          </>
        )}
      </Grid>
    </Grid>
  )
}

export default Step3
