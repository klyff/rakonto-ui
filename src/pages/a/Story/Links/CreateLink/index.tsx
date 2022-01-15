import React, { useContext } from 'react'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'
import { FormikValues, useFormik } from 'formik'
import TextField from '@mui/material/TextField'
import schema from './schema'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import api from '../../../../../lib/api'
import { LinkType } from '../../../../../lib/types'
import Typography from '@mui/material/Typography'
import { SimpleSnackbarContext } from '../../../../../components/SimpleSnackbar'
import LoadingButton from '@mui/lab/LoadingButton'

interface iCreateLink {
  storyId: string
  onClose: (link?: LinkType) => void
}

const CreateLink: React.FC<iCreateLink> = ({ storyId, onClose }) => {
  const { actions: snackActions } = useContext(SimpleSnackbarContext)

  const handleClose = (link?: LinkType) => {
    onClose(link)
  }

  const onSubmit = async ({ url }: FormikValues) => {
    try {
      const link = await api.createLink({ storyId, url })
      snackActions.open(`${link.url} added to this story!`)
      handleClose(link)
    } catch (error) {
      // @ts-ignore
      const { data } = error
      if (data.code) {
        snackActions.open(`Error to add ${url} to this story!`)
        return
      }
      snackActions.open('Something was wrong! please try again.')
    }
  }

  const initialValues: { url: string } = {
    url: ''
  }

  const { isSubmitting, values, handleBlur, handleChange, touched, errors, handleSubmit } = useFormik({
    initialValues,
    validationSchema: schema,
    onSubmit
  })

  return (
    <form>
      <Dialog
        fullWidth
        maxWidth="sm"
        onClose={(event, reason) => {
          if (reason !== 'backdropClick') {
            handleClose()
          }
        }}
        open={true}
      >
        <DialogTitle>
          Create link
          <IconButton
            aria-label="close"
            onClick={() => handleClose()}
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
          <Typography sx={{ marginBottom: 3 }} gutterBottom>
            Type or paste a link to associate with this story:
          </Typography>
          <TextField
            autoFocus
            name="url"
            fullWidth
            label="Url"
            type="text"
            value={values.url}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.url && Boolean(errors.url)}
            helperText={(touched.url && errors.url) || ' '}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose()} sx={{ mt: 1, mr: 1 }}>
            Cancel
          </Button>
          <LoadingButton
            loading={isSubmitting}
            variant="contained"
            onClick={() => handleSubmit()}
            sx={{ mt: 1, mr: 1 }}
          >
            Create
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </form>
  )
}

export default CreateLink
