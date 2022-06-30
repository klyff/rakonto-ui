import React from 'react'
import { InviteType } from '../../../../lib/types'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import { Field, FieldProps } from 'formik'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import FormGroup from '@mui/material/FormGroup'

const Step4: React.FC<{ invite: InviteType }> = ({ invite }) => {
  const name = invite.organization?.name || `${invite.user.firstName} ${invite.user.lastName}`
  const email = invite.organization?.email || invite.user.email
  return (
    <Grid container>
      {invite?.callToAction && invite?.callToActionButtonLabel ? (
        <Grid textAlign="center" justifySelf="center" item xs={12} mt={6}>
          {invite.callToActionInstructions && (
            <Typography variant="h6" mb={5}>
              {invite.callToActionInstructions}
            </Typography>
          )}
          <Button href={invite.callToAction} target="_blank" rel="noreferrer" variant="contained">
            {invite.callToActionButtonLabel}
          </Button>
        </Grid>
      ) : (
        <Box sx={{ mb: { xs: 10, md: 'unset' } }}>
          <Grid item xs={12}>
            <Typography variant="h6" mb={2}>
              {`Thank you for using Rakonto to submit your recording! We have notified ${name} that you have submitted your recording. If you have any questions
          about your recording, please contact ${name} at `}
              <Link href={`mailTo:${email}`} target="_blank">
                {email}
              </Link>
              .
            </Typography>
            <Typography variant="h6">
              At Rakonto, we take your privacy seriously. To best serve you, please let us know how we may use the
              contact information you entered when submitting your recording:
            </Typography>
          </Grid>
          <Grid textAlign="center" item xs={12} mt={4}>
            <FormGroup>
              <Field name="allowEmail" type="checkbox">
                {({ field }: FieldProps) => (
                  <>
                    <FormControlLabel
                      control={<Checkbox sx={{ alignSelf: 'start', pt: 0 }} {...field} />}
                      label="Rakonto may send me emails about product updates and promotions"
                    />
                  </>
                )}
              </Field>
              <Field name="allowShareInfo" type="checkbox">
                {({ field }: FieldProps) => (
                  <>
                    <FormControlLabel
                      control={<Checkbox {...field} />}
                      label="Rakonto may share my information with its marketing partners"
                    />
                  </>
                )}
              </Field>
            </FormGroup>
          </Grid>
          <Grid textAlign="center" item xs={12} mt={4}>
            <Button
              autoFocus
              href={'/u/signup'}
              sx={{ maxWidth: { xs: 'inherit', md: '400px' } }}
              variant="contained"
              fullWidth
            >
              Confirm and create a Rakonto account now
            </Button>
          </Grid>
          <Grid textAlign="center" justifySelf="center" item xs={12} mt={2}>
            <Button
              href="http://rakonto.io"
              sx={{ maxWidth: { xs: 'inherit', md: '400px' } }}
              variant="outlined"
              fullWidth
            >
              Confirm without creating a Rakonto account
            </Button>
          </Grid>
          <Grid textAlign="center" justifySelf="center" item xs={12} mt={2}>
            <Button href={'/u/signin'} sx={{ maxWidth: { xs: 'inherit', md: '400px' } }} fullWidth>
              If you already have a Rakonto account, you may login.
            </Button>
          </Grid>
        </Box>
      )}
    </Grid>
  )
}

export default Step4
