import React from 'react'
import { InviteContributorType } from '../../../../lib/types'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'
import Button from '@mui/material/Button'
import FormGroup from '@mui/material/FormGroup'
import { Field, FieldProps } from 'formik'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'

const Step4: React.FC<{ invite: InviteContributorType }> = ({ invite }) => {
  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography variant="h6" mb={2}>
          {`Thank you for using Rakonto to submit your content! We have notified ${invite.user.firstName} ${invite.user.lastName} that you have submitted your content. If you have any questions
          about your content, please contact ${invite.user.firstName} ${invite.user.lastName} at `}
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
      <Grid textAlign="center" item xs={12} mt={4}>
        <Button
          autoFocus
          href={'/u/signup'}
          sx={{ maxWidth: { xs: 'inherit', md: '400px' } }}
          variant="contained"
          fullWidth
        >
          Create new account now
        </Button>
      </Grid>
      <Grid textAlign="center" justifySelf="center" item xs={12} mt={2}>
        <Button href="http://rakonto.io" sx={{ maxWidth: { xs: 'inherit', md: '400px' } }} variant="outlined" fullWidth>
          I&apos;ll create an account later
        </Button>
      </Grid>
      <Grid textAlign="center" justifySelf="center" item xs={12} mt={2}>
        <Button href={'/u/signin'} sx={{ maxWidth: { xs: 'inherit', md: '400px' } }} fullWidth>
          If you already have a Rakonto account, you may login.
        </Button>
      </Grid>
    </Grid>
  )
}

export default Step4
