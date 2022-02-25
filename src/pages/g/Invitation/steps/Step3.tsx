import React from 'react'
import { Invite } from '../../../../lib/types'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'
import TextField from '@mui/material/TextField'
import { useField } from 'formik'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'

const Step3: React.FC<{ invite: Invite; progress: number }> = ({ invite, progress }) => {
  const [{ onChange: firstNameOnChange, onBlur: firstNameOnBlur, value: firstNameValue }, { error, touched }] =
    useField('firstName')
  const [{ onChange: lastNameOnChange, onBlur: lastNameOnBlur, value: lastNameValue }] = useField('lastName')
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h6" mb={2}>
          {`Your recording is saved! Please enter your name and email so we can inform
          ${invite.user.firstName} that you have submitted your recording, and that you authorize
          ${invite.user.firstName} to share it in accordance with our `}
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
          label="First name"
          name="firstName"
          type="text"
          value={firstNameValue}
          onChange={firstNameOnChange}
          onBlur={firstNameOnBlur}
          error={touched && Boolean(error)}
          helperText={(touched && error) || ' '}
          fullWidth
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          label="Last name"
          name="lastName"
          type="text"
          value={lastNameValue}
          onChange={lastNameOnChange}
          onBlur={lastNameOnBlur}
          fullWidth
        />
      </Grid>
      {!!progress && (
        <Box sx={{ position: 'relative', display: 'inline-flex' }}>
          <CircularProgress variant="determinate" value={progress || 0} />
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
            <Typography variant="caption" component="div" color="text.secondary">
              {`${Math.round(progress || 0)}%`}
            </Typography>
          </Box>
        </Box>
      )}
    </Grid>
  )
}

export default Step3
