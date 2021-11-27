import * as React from 'react'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Button from '@mui/material/Button'
import { SimpleDialogContext } from './Context'
import { useContext } from 'react'
import { iSimpleDialog } from './index'

interface iSimpleDialogComponent {
  store: iSimpleDialog
}

const SimpleDialog: React.FC<iSimpleDialogComponent> = ({ store }) => {
  const { actions } = useContext(SimpleDialogContext)
  const handleClose = (value: boolean) => {
    if (store.callback) {
      store.callback(value)
    }
    actions.close()
  }
  return (
    <Dialog open={true} onClose={() => handleClose(false)}>
      <DialogTitle id="alert-dialog-title">{store.title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">{store.content}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={() => handleClose(false)} autoFocus>
          {store.cancelText}
        </Button>
        {store.showOk && (
          <Button color="secondary" onClick={() => handleClose(true)}>
            {store.okText}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  )
}

export default SimpleDialog
