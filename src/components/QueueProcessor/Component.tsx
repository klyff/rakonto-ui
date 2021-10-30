import * as React from 'react'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'
import { QueueProcessorContext } from './Context'
import { useContext } from 'react'
import Popover from '@mui/material/Popover'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import Typography from '@mui/material/Typography'
import { ListItemSecondaryAction } from '@mui/material'

const QueueStage: React.FC = () => {
  const { store: list, anchor, actions } = useContext(QueueProcessorContext)

  const open = Boolean(anchor)
  const id = open ? 'simple-popover' : undefined

  return (
    <>
      <Popover
        id={id}
        open={open}
        anchorEl={anchor}
        onClose={actions.close}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
      >
        <Paper
          sx={{
            padding: 4,
            width: 500
          }}
        >
          <Typography id="draggable-qeue-dialog" style={{ cursor: 'move' }}>
            Queue
          </Typography>
          <List dense>
            {list.map(item => {
              return (
                <ListItem key={item.id}>
                  <ListItemAvatar>
                    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                      <CircularProgress variant="determinate" value={item.progress || 0} />
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
                    </Box>
                  </ListItemAvatar>
                  <ListItemText primary={item.title} secondary={item.type} />
                  {item.type === 'FINISHED' && (
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
      </Popover>
    </>
  )
}

export default QueueStage
