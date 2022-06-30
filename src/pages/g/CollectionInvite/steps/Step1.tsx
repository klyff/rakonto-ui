import React from 'react'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { InviteType } from '../../../../lib/types'
import Player from '../../../../components/Player'

const Step1: React.FC<{ invite: InviteType }> = ({ invite }) => {
  const name = invite.organization?.name || `${invite.user.firstName} ${invite.user.lastName}`
  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography variant="h6" mb={4}>
          {`Hi! ${name} has invited you to record a story. Here is their message to you:`}
        </Typography>
        {invite.description && (
          <Typography variant="h6" mb={2}>
            {invite.description}
          </Typography>
        )}
      </Grid>
      {invite.video && (
        <Grid item xs={12} mb={12}>
          <Player subtitles={[]} type={'VIDEO'} media={invite.video} />
        </Grid>
      )}
    </Grid>
  )
}

export default Step1
