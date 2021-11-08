import React, { useState, useContext, useEffect } from 'react'
import { QueueProcessorContext } from './Context'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import CircularProgress from '@mui/material/CircularProgress'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import MusicNoteIcon from '@mui/icons-material/MusicNote'
import MovieIcon from '@mui/icons-material/Movie'
import FileUploadIcon from '@mui/icons-material/FileUpload'
import { ListItemSecondaryAction } from '@mui/material'
import Collapse from '@mui/material/Collapse'

const QueueStage: React.FC = () => {
  const { store: list, actions } = useContext(QueueProcessorContext)
  const [open, setOpen] = useState<boolean>(false)
  const [isQueued] = useState<number>(list.filter(item => item.step !== 'FINISHED').length)
  const [closeDisabled, setCloseDisabled] = useState<boolean>(false)

  useEffect(() => {
    setCloseDisabled(!list.some(item => item.step !== 'FINISHED'))
  }, [list])

  return (
    <Box
      sx={{
        zIndex: '999',
        position: 'fixed',
        width: '500px',
        right: 24,
        bottom: 0
      }}
    >
      <Box
        sx={{
          borderRadius: '8px 8px 0px 0px',
          backgroundColor: 'grey.700',
          height: '64px',
          display: 'flex',
          paddingLeft: 3,
          paddingRight: 1,
          alignItems: 'center'
        }}
      >
        <Typography>{isQueued} stories in uploading or processing queue </Typography>
        <Box
          sx={{
            flex: '1'
          }}
        />
        <IconButton
          onClick={() => {
            setOpen(!open)
          }}
        >
          {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </IconButton>
        <IconButton disabled={closeDisabled} onClick={actions.close}>
          <CloseIcon />
        </IconButton>
      </Box>
      <Collapse in={open}>
        <Paper sx={{ borderRadius: 'unset' }}>
          <List dense>
            {list.map(item => {
              return (
                <ListItem key={item.id}>
                  <ListItemAvatar>
                    {item.type === 'FILE' && <FileUploadIcon />}
                    {item.type === 'AUDIO' && <MusicNoteIcon />}
                    {item.type === 'VIDEO' && <MovieIcon />}
                  </ListItemAvatar>
                  <ListItemText primary={item.title} secondary={item.step} />
                  <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                    <CircularProgress
                      variant={!item.finished && item.progress === undefined ? 'indeterminate' : 'determinate'}
                      value={item.progress || 0}
                    />
                    {!item.finished && item.progress !== undefined && (
                      <Box
                        sx={{
                          top: 0,
                          left: 0,
                          bottom: 0,
                          right: 0,
                          position: 'absolute',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        <Typography variant="caption" component="div" color="text.secondary">
                          {`${Math.round(item.progress || 0)}%`}
                        </Typography>
                      </Box>
                    )}
                  </Box>
                  {item.step === 'FINISHED' && (
                    <ListItemSecondaryAction>
                      <IconButton edge="end" onClick={() => actions.remove(item.id as string)} aria-label="delete">
                        <CloseIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  )}
                </ListItem>
              )
            })}
          </List>
        </Paper>
      </Collapse>
    </Box>
  )
}

export default QueueStage
