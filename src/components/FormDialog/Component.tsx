import * as React from 'react'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import MenuItem from '@mui/material/MenuItem'
import Button from '@mui/material/Button'
import { FormDialogContext } from './Context'
import { useContext } from 'react'
import { Formik, Form, FormikValues } from 'formik'
import TextField from '@mui/material/TextField'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'

const FormDialog: React.FC = () => {
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'))
  const { store, actions } = useContext(FormDialogContext)
  const submit = (values: FormikValues) => {
    store.submit(values)
    actions.close()
  }

  return (
    <Formik
      initialValues={store.initialValues}
      enableReinitialize
      validationSchema={store.validationSchema}
      onSubmit={submit}
    >
      {({ isSubmitting, handleBlur, values, handleChange, touched, errors, handleSubmit }) => (
        <Form>
          <Dialog fullScreen={fullScreen} open={true}>
            <DialogTitle>{store.title}</DialogTitle>
            <DialogContent>
              <DialogContentText sx={{ paddingBottom: 3 }}>{store.content}</DialogContentText>
              {store.fields?.map(field => {
                if (field.type === 'select') {
                  return (
                    <TextField
                      key={field.name}
                      name={field.name}
                      fullWidth
                      select
                      margin="dense"
                      variant="outlined"
                      type={field.type}
                      placeholder={field.placeholder}
                      value={values[field.name]}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched[field.name] && Boolean(errors[field.name])}
                      helperText={(touched[field.name] && errors[field.name]) || ' '}
                    >
                      {(field.options || []).map(option => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </TextField>
                  )
                }
                return (
                  <TextField
                    key={field.name}
                    name={field.name}
                    fullWidth
                    margin="dense"
                    variant="outlined"
                    type={field.type}
                    placeholder={field.placeholder}
                    value={values[field.name]}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched[field.name] && Boolean(errors[field.name])}
                    helperText={(touched[field.name] && errors[field.name]) || ' '}
                  />
                )
              })}
            </DialogContent>
            <DialogActions>
              <Button color="secondary" onClick={actions.close}>
                {store.cancelText}
              </Button>
              <Button variant="outlined" autoFocus onClick={() => handleSubmit()}>
                {store.okText}
              </Button>
            </DialogActions>
          </Dialog>
        </Form>
      )}
    </Formik>
  )
}

export default FormDialog
