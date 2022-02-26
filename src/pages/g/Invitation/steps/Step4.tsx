import React from 'react'
import { InviteType } from '../../../../lib/types'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'

const Step4: React.FC<{ invite: InviteType }> = ({ invite }) => {
  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography variant="h6" mb={2}>
          {`We have notified ${invite.user.firstName} that you have submitted your recording. If you have any questions
          about your recording, please contact ${invite.user.firstName} at `}
          <Link href={`mailTo:${invite.user.email}`} target="_blank">
            {invite.user.email}
          </Link>
          .
        </Typography>
        <Typography variant="h6">
          We now invite you to create a Rakonto account so you too can record, share and view stories.
        </Typography>
      </Grid>
      <Grid textAlign="center" item xs={12} mt={4}>
        <Button href={'/u/signup'} sx={{ maxWidth: { xs: 'inherit', md: '300px' } }} variant="contained" fullWidth>
          Create new account now
        </Button>
      </Grid>
      <Grid textAlign="center" justifySelf="center" item xs={12} mt={2}>
        <Button href="http://rakonto.io" sx={{ maxWidth: { xs: 'inherit', md: '300px' } }} fullWidth>
          I&apos;ll create an account later
        </Button>
      </Grid>
    </Grid>
  )
}

export default Step4
