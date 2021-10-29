import * as React from 'react'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'
import { QueueProcessorContext } from './Context'
import { useContext, useEffect, useState } from 'react'
import Draggable from 'react-draggable'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

const PaperComponent: React.FC = props => {
  return (
    <Draggable handle="#draggable-qeuedialog" cancel={'[class*="MuiDialogContent-root"]'}>
      <Paper {...props} />
    </Draggable>
  )
}

const QueueStage: React.FC = () => {
  const { store, actions } = useContext(QueueProcessorContext)
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [list, setList] = useState(() =>
    Object.keys(store).map(key => ({
      id: key,
      ...store[key]
    }))
  )

  useEffect(() => {
    setList(
      Object.keys(store).map(key => ({
        id: key,
        ...store[key]
      }))
    )
  }, [store])

  useEffect(() => {
    if (list.length) {
      setIsOpen(true)
    }
  }, [list])

  const close = () => {
    setIsOpen(false)
  }
  return (
    <Dialog
      fullWidth
      maxWidth="xs"
      open={isOpen}
      hideBackdrop
      disablePortal
      onClose={close}
      PaperComponent={PaperComponent}
    >
      <DialogTitle id="draggable-qeuedialog" style={{ cursor: 'move' }}>
        Queue
      </DialogTitle>
      <DialogContent>
        <List dense>
          {list.map(item => {
            console.log(item)
            return (
              <ListItem key={item.id}>
                <ListItemText primary={item.title} secondary={item.type} />
                <ListItemIcon>
                  <Box
                    sx={{
                      width: '100%',
                      height: 422,
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}
                  >
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
                  </Box>
                </ListItemIcon>
              </ListItem>
            )
          })}
        </List>
      </DialogContent>
      <DialogActions>
        <Button onClick={close}>{'Close'}</Button>
      </DialogActions>
    </Dialog>
  )
}

export default QueueStage
