import React, { useState, useContext, useEffect } from 'react'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { ChangeMediaContext } from './Context'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import { QueueProcessorContext } from '../QueueProcessor'
import { SimpleSnackbarContext } from '../SimpleSnackbar'
import InputFileArea from '../InputFileArea'
import api from '../../lib/api'

const ChangeMedia: React.FC<{ storyId: string }> = ({ storyId }) => {
  const { actions: queueActions } = useContext(QueueProcessorContext)
  const { store, actions } = useContext(ChangeMediaContext)
  const { actions: snackActions } = useContext(SimpleSnackbarContext)
  const [file, setFile] = useState<File | null>(null)

  const handleSave = async () => {
    const story = await api.getStory(storyId)

    try {
      await queueActions.addProcessor({
        id: story.id,
        step: 'UPLOAD',
        type: 'FILE',
        action: 'REPLACE',
        title: story.title,
        description: story.description,
        file: file!
      })

      snackActions.open(
        `Rakonto is now uploading and processing your new media of story. It may take a while. We'll send you an email when it's completed.`
      )
      setFile(null)
      actions.close()
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <Dialog
      fullWidth
      maxWidth="md"
      onClose={(event, reason) => {
        if (reason !== 'backdropClick') {
          setFile(null)
          actions.close()
        }
      }}
      open={store.isOpen}
    >
      <DialogTitle>
        Replace video/audio
        <IconButton
          aria-label="close"
          onClick={actions.close}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <Box sx={{ width: '100%' }}>
          <Typography align="center" variant="body2" fontWeight="400" marginBottom={3} gutterBottom>
            You can now upload or record your story (audio or video).
          </Typography>
          <InputFileArea file={file} callback={(file: File | null) => setFile(file)} />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            setFile(null)
            actions.close()
          }}
          sx={{ mt: 1, mr: 1 }}
        >
          Cancel
        </Button>
        <Button variant="contained" disabled={!file} onClick={handleSave} sx={{ mt: 1, mr: 1 }}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ChangeMedia
