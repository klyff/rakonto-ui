import React, { useContext } from 'react'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import { Formik, Form } from 'formik'
import schema from './schema'
import api from '../../../lib/api'
import { SimpleDialogContext } from '../../../components/SimpleDialog'
import { SimpleSnackbarContext } from '../../../components/SimpleSnackbar'
import Divider from '@mui/material/Divider'
import { Typography } from '@mui/material'
import { PasswordResetForm } from '../../../lib/types'
import { RouteComponentProps } from 'react-router-dom'
import { parse } from 'qs'

const PasswordReset: React.FC<RouteComponentProps> = ({ location, history }) => {
  const { token } = parse(location?.search as string, { ignoreQueryPrefix: true })
  const { actions: dialogActions } = useContext(SimpleDialogContext)
  const { actions: snackActions } = useContext(SimpleSnackbarContext)

  const handleSubmit = async ({ password, confirmation, token }: PasswordResetForm) => {
    try {
      await api.passwordReset({ password, confirmation, token })
      dialogActions.open('Password changed', <>Your password has been reseted.</>)
      history.push('/u/signin')
    } catch (error) {
      // @ts-ignore
      const { data } = error
      if (data.code === '1003') {
        dialogActions.open('Password change', <>This link to change the password has expired. Please try again!</>)
        history.push('/u/signin')
        return
      }

      if (data.code === '1002') {
        dialogActions.open('Password change', <>This link not exists.</>)
        history.push('/u/signin')
        return
      }

      snackActions.open('Something was wrong! please try again.')
    }
  }

  return (
    <Formik
      initialValues={{ password: '', confirmation: '', token: token as string }}
      validationSchema={schema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, handleBlur, values, handleChange, touched, errors }) => (
        <Form>
          <Grid container spacing={4} direction="row" justifyContent="center" alignItems="center">
            <Grid item xs={12}>
              <Typography variant="h6">
                For the most secure password create one with at least 8 numbers or letters:
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="password"
                fullWidth
                placeholder="Password"
                label="Password"
                type="password"
                autoComplete="false"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.password && Boolean(errors.password)}
                helperText={(touched.password && errors.password) || ' '}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="confirmation"
                fullWidth
                placeholder="Password confirmation"
                label="Password confirmation"
                type="password"
                autoComplete="false"
                value={values.confirmation}
                onBlur={handleBlur}
                onChange={handleChange}
                error={touched.confirmation && Boolean(errors.confirmation)}
                helperText={(touched.confirmation && errors.confirmation) || ' '}
              />
            </Grid>
            <Grid item xs={12}>
              <Button color={'primary'} variant="contained" fullWidth type="submit">
                Change
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

export default PasswordReset
