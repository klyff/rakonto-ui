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
import InfoIcon from '@mui/icons-material/Info'

const Step4: React.FC<{ invite: InviteType }> = ({ invite }) => {
  const name = invite.organization?.name || `${invite.user.firstName} ${invite.user.lastName}`
  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography variant="h6" mb={2}>
          {`Thank you for using Rakonto to submit your recording! We have notified ${name} that you have submitted your recording. If you have any questions
          about your recording, please contact ${name} at `}
          <Link href={`mailTo:${invite.user.email}`} target="_blank">
            {invite.user.email}
          </Link>
          .
        </Typography>
        <Typography variant="h6">
          At Rakonto, we take your privacy seriously. To best serve you, please let us know how we may use the contact
          information you entered when submitting your recording:
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
      {invite?.callToAction && invite?.callToActionButtonLabel ? (
        <Grid textAlign="center" justifySelf="center" item xs={12} mt={6}>
          {invite.callToActionInstructions && (
            <Box
              sx={{
                maxWidth: { xs: 'inherit', md: '400px' },
                position: 'relative',
                left: 18,
                right: 0,
                marginX: 'auto'
              }}
            >
              <Typography align="left" variant="body1" gutterBottom>
                <InfoIcon sx={{ fontSize: '0.8rem' }} /> {invite.callToActionInstructions}
              </Typography>
            </Box>
          )}
          <Button
            href={invite.callToAction}
            target="_blank"
            rel="noreferrer"
            sx={{ maxWidth: { xs: 'inherit', md: '400px' } }}
            fullWidth
            variant="contained"
          >
            {invite.callToActionButtonLabel}
          </Button>
        </Grid>
      ) : (
        <>
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
        </>
      )}
    </Grid>
  )
}

export default Step4
