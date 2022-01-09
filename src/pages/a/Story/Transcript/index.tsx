import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import api from '../../../../lib/api'
import { TranscriptionType } from '../../../../lib/types'

interface iTranscript {
  transcription?: TranscriptionType
  canEdit: boolean
  storyId: string
}

const Transcript: React.FC<iTranscript> = ({ transcription, canEdit, storyId }) => {
  const [localTranscription, setLocalTranscription] = useState<TranscriptionType | undefined>(transcription)
  const [text, setText] = useState<string>('')
  const [editMode, setEditMode] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const fetch = async () => {
    if (!localTranscription?.id) {
      setIsLoading(false)
      return
    }
    const transcript = await api.getTranscriptions(localTranscription.id)
    setLocalTranscription(transcript)
    setIsLoading(false)
  }

  const update = async () => {
    const transcript = localTranscription?.id
      ? await api.updateTranscriptions(localTranscription.id, { storyId, content: text })
      : await api.createTranscriptions({ storyId, content: text })
    setLocalTranscription(transcript)
    setEditMode(false)
  }

  useEffect(() => {
    setIsLoading(true)
    fetch()
  }, [])

  useEffect(() => {
    if (!localTranscription?.id) return
    setText(localTranscription.content)
  }, [localTranscription])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value)
  }

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
            {editMode ? (
              <>
                <Button color="secondary" onClick={() => setEditMode(false)} sx={{ mt: 1, mr: 1 }}>
                  Cancel
                </Button>
                <Button variant="outlined" onClick={update} sx={{ mt: 1, mr: 1 }}>
                  Save
                </Button>
              </>
            ) : (
              <Button variant="outlined" onClick={() => setEditMode(true)} sx={{ mt: 1, mr: 1 }}>
                Edit
              </Button>
            )}
          </Box>
          <Divider sx={{ margin: '24px 0' }} />
        </>
      )}
      {isLoading ? (
        <CircularProgress variant="indeterminate" />
      ) : editMode ? (
        <TextField multiline value={text} onChange={handleChange} />
      ) : (
        <Typography component="pre" align="justify" paragraph>
          {text}
        </Typography>
      )}
    </Box>
  )
}

export default Transcript
