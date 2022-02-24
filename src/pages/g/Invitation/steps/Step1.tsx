import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { Invite } from '../../../../lib/types'
import Player from '../../../../components/Player'

const Step1: React.FC<{ invite: Invite }> = ({ invite }) => {
  return (
    <>
      {' '}
      <Typography mb={2}>
        {`Hi! ${invite.onwer.firstName} ${invite.onwer.lastName} has invited you to record a story. Here is what ${invite.onwer.firstName} is looking for:`}
      </Typography>
      <Typography mb={2}>{invite.title}</Typography>
      <Typography mb={2}>{invite.description}</Typography>
      <Typography mb={2}>First, where would you like to save these recordings?</Typography>
      <Box>
        <Player subtitles={[]} type={'VIDEO'} media={invite.video} />
      </Box>
    </>
  )
}

export default Step1
