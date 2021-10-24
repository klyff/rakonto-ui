import * as React from 'react'
import Snackbar from '@mui/material/Snackbar'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import { SimpleSnackbarContext } from './Context'
import { useContext } from 'react'

const SimpleSnackbar = () => {
  const { store, actions } = useContext(SimpleSnackbarContext)
  return (
    <Snackbar
      open={store.isOpen as boolean}
      autoHideDuration={6000}
      onClose={actions.close}
      message={store.message}
      action={
        <>
          <IconButton size="small" aria-label="close" color="inherit" onClick={actions.close}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </>
      }
    />
  )
}

export default SimpleSnackbar
