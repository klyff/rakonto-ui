import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import api from '../../../../lib/api'

interface iTranscript {
  transcriptionId: string
  canEdit: boolean
  storyId: string
}

const Transcript: React.FC<iTranscript> = ({ transcriptionId, canEdit, storyId }) => {
  const [editMode, setEditMode] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [text, setText] = useState<string>('')

  const fetch = async () => {
    const transcript = await api.getTranscriptions(transcriptionId)
    setText(transcript.content)
    setIsLoading(false)
  }

  const update = async () => {
    const transcript = await api.updateTranscriptions(transcriptionId, { storyId, content: text })
    setText(transcript.content)
    setEditMode(false)
  }

  useEffect(() => {
    setIsLoading(true)
    fetch()
  }, [])

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
