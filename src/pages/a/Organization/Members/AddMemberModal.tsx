import React, { useContext } from 'react'
import { useFormik } from 'formik'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import { SimpleSnackbarContext } from '../../../../components/SimpleSnackbar'
import api from '../../../../lib/api'
import { OrganizationMemberType } from '../../../../lib/types'
import schema from './schema'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'

interface iAddMemberModal {
  id: string
  onClose: (member?: OrganizationMemberType) => void
}

const AddMemberModal: React.FC<iAddMemberModal> = ({ id, onClose }) => {
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'))
  const { actions: snackActions } = useContext(SimpleSnackbarContext)

  const onSubmit = async ({ email }: { email: string }) => {
    try {
      const member = await api.organizationAddMembers(id, email)
      snackActions.open(`${email} added to organization`)
      onClose(member)
    } catch (error) {
      snackActions.open(`Problem to add ${email} to organization`)
    }
  }

  const { isSubmitting, values, handleBlur, handleChange, touched, errors, handleSubmit, resetForm, setFieldValue } =
    useFormik({
      initialValues: { email: '' },
      validationSchema: schema,
      onSubmit
    })

  return (
    <Dialog open fullScreen={fullScreen} fullWidth maxWidth="md">
      <DialogTitle id="alert-dialog-title">Add new organization member</DialogTitle>
      <DialogContent>
        {' '}
        <form>
          <TextField
            margin="normal"
            name="email"
            fullWidth
            placeholder="Email address"
            label="Email address"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.email && Boolean(errors.email)}
            helperText={(touched.email && errors.email) || ' '}
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => onClose()} autoFocus>
          Cancel
        </Button>
        <Button onClick={() => handleSubmit()}>Add</Button>
      </DialogActions>
    </Dialog>
  )
}

export default AddMemberModal
