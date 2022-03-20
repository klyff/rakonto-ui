import React, { useEffect, useState, useContext } from 'react'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import api from '../../../../lib/api'
import { TranscriptionType } from '../../../../lib/types'
import { SimpleDialogContext } from '../../../../components/SimpleDialog'

interface iTranscript {
  isEditor: boolean
  storyId: string
  refetch: () => void
}

const Transcript: React.FC<iTranscript> = ({ isEditor, storyId, refetch: refetchStory }) => {
  const { actions: simpleDialogActions } = useContext(SimpleDialogContext)
  const [localTranscription, setLocalTranscription] = useState<TranscriptionType | undefined>(undefined)
  const [text, setText] = useState<string>('')
  const [editMode, setEditMode] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const fetch = async () => {
    const transcripts = await api.getTranscriptions(0, 1000, [storyId])
    setLocalTranscription(transcripts.content[0])
    setIsLoading(false)
  }

  const update = async () => {
    const transcript = localTranscription?.id
      ? await api.updateTranscriptions(localTranscription.id, { storyId, content: text })
      : await api.createTranscriptions({ storyId, content: text })
    setLocalTranscription(transcript)
    setEditMode(false)
    simpleDialogActions.open(
      'Transcript Updated',
      'To see your changes reflected in the captions displayed in the video player, you will need to refresh the page and Select English Transcript in the video player caption control. Do you want to see your changes?',
      { okText: 'Yes, refresh the page now', cancelText: 'No, I will refresh later', showOk: true },
      success => {
        if (success) window.location.reload()
      }
    )
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
      <Box
        sx={{
          padding: '0 24px',
          minHeight: '40vh'
        }}
      >
        {isEditor && (
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
          <TextField multiline minRows={4} value={text} fullWidth onChange={handleChange} />
        ) : (
          <Typography component="pre" align="justify" paragraph>
            {text}
          </Typography>
        )}
      </Box>
    </Box>
  )
}

export default Transcript
