import React from 'react'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import Button from '@mui/material/Button'
import { TranscriptionType } from '../../../../lib/types'

interface iTranscript {
  transcription: TranscriptionType
  canEdit: boolean
  storyId: string
}

const Transcript: React.FC<iTranscript> = ({ transcription, canEdit, storyId }) => {
  return (
    <Box
      component={Paper}
      sx={{
        width: '100%',
        display: 'flex',
        padding: 3,
        flexFlow: 'column'
      }}
    >
      {canEdit && (
        <>
          <Box>
            <Button variant="outlined" onClick={() => alert('edit')} sx={{ mt: 1, mr: 1 }}>
              Edit
            </Button>
          </Box>
        </>
      )}

      <Divider sx={{ margin: '24px 0' }} />
      {transcription && (
        <Typography component="pre" align="center" paragraph>
          {transcription.content}
        </Typography>
      )}
    </Box>
  )
}

export default Transcript
