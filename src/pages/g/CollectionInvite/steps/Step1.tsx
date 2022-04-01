import React from 'react'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { InviteType } from '../../../../lib/types'
import Player from '../../../../components/Player'

const Step1: React.FC<{ invite: InviteType }> = ({ invite }) => {
  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography variant="h6" mb={2}>
          Hi! <br />
          {`${invite.user.firstName} ${invite.user.lastName} has invited you to record a story.`}
          <br />
          {`Here is what ${invite.user.firstName} ${invite.user.lastName} is looking for:`}
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
      {invite.video && (
        <Grid item xs={12} mb={12}>
          <Player subtitles={[]} type={'VIDEO'} media={invite.video} />
        </Grid>
      )}
    </Grid>
  )
}

export default Step1
