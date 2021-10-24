import * as React from 'react'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Button from '@mui/material/Button'
import { SimpleDialogContext } from './Context'
import { useContext } from 'react'

const SimpleDialog: React.FC = () => {
  const { store, actions } = useContext(SimpleDialogContext)
  return (
    <Dialog open={store.isOpen as boolean} onClose={actions.close}>
      <DialogTitle id="alert-dialog-title">{store.title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">{store.content}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={actions.close}>{store.cancelText}</Button>
        {store.showOk && (
          <Button onClick={actions.close} autoFocus>
            {store.okText}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  )
}

export default SimpleDialog
