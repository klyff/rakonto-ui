import React from 'react'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { InviteContributorType } from '../../../../lib/types'

const Step1: React.FC<{ invite: InviteContributorType }> = ({ invite }) => {
  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography variant="h6" mb={2}>
          Hi! <br />
          {`${invite.user.firstName} ${invite.user.lastName} has invited you to contribute.`}
          <br />
          {`Here is what ${invite.user.firstName} is looking for:`}
        </Typography>
        <Typography variant="subtitle2">Title:</Typography>
        <Typography variant="subtitle1" mb={2}>
          {invite.title}
        </Typography>
        <Typography variant="subtitle2">Instructions:</Typography>
        <Typography variant="subtitle1" mb={2}>
          {invite.description}
        </Typography>
      </Grid>
    </Grid>
  )
}

export default Step1
