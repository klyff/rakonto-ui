import React, { useContext } from 'react'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import { Formik, Form } from 'formik'
import schema from './schema'
import { ApiContext } from '../../../lib/api'
import { SimpleDialogContext } from '../../../components/SimpleDialog'
import { SimpleSnackbarContext } from '../../../components/SimpleSnackbar'
import Divider from '@mui/material/Divider'
import { RouteComponentProps } from 'react-router-dom'

const ForgotPassword: React.FC<RouteComponentProps> = ({ history }) => {
  const { api } = useContext(ApiContext)
  const { actions: dialogActions } = useContext(SimpleDialogContext)
  const { actions: snackActions } = useContext(SimpleSnackbarContext)

  const handleSubmit = async ({ email }: { email: string }) => {
    try {
      await api().requestPasswordReset(email)
      dialogActions.open('Forgot Password', 'We sent you an email with a link to reset your password.')
      history.push('/u/signin')
    } catch (error) {
      // @ts-ignore
      const { data } = error
      snackActions.open('Something was wrong! please try again.')
    }
  }

  return (
    <Formik initialValues={{ email: '' }} validationSchema={schema} onSubmit={handleSubmit}>
      {({ isSubmitting, handleBlur, values, handleChange, touched, errors }) => (
        <Form>
          <Grid container spacing={4} direction="row" justifyContent="center" alignItems="center">
            <Grid item xs={12}>
              <TextField
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
            </Grid>
            <Grid item xs={12}>
              <Button color={'primary'} variant="contained" fullWidth type="submit">
                Submit
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Divider />
            </Grid>
            <Grid item xs>
              <Button href="/u/signin" fullWidth>
                Back to login
              </Button>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  )
}

export default ForgotPassword
