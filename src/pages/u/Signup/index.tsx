import React, { useContext } from 'react'
import { Form, Formik } from 'formik'
import schema from './schema'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import { SingupFormType } from '../../../lib/types'
import { SimpleDialogContext } from '../../../components/SimpleDialog'
import { SimpleSnackbarContext } from '../../../components/SimpleSnackbar'
import Divider from '@mui/material/Divider'
import api from '../../../lib/api'
import { RouteComponentProps } from 'react-router-dom'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'

const Signup: React.FC<RouteComponentProps> = ({ history }) => {
  const { actions: dialogActions } = useContext(SimpleDialogContext)
  const { actions: snackActions } = useContext(SimpleSnackbarContext)

  const handleSubmit = async ({ email, firstName, lastName, password, confirmation }: SingupFormType) => {
    try {
      await api.singup({ email, firstName, lastName, password, confirmation })
      history.push('/u/signin')
      dialogActions.open('Confirm email', 'We sent an email to you to confirm your account. Please check this.', {
        cancelText: 'Close'
      })
    } catch (error) {
      // @ts-ignore
      const { data } = error
      if (data.code === '1001') {
        snackActions.open('A Rakonto account with this email address already exists.')
        return
      }
      snackActions.open('Something was wrong! please try again.')
    }
  }

  const initialValues: SingupFormType = {
    email: '',
    password: '',
    confirmation: '',
    firstName: '',
    lastName: ''
  }

  return (
    <Formik initialValues={initialValues} validationSchema={schema} onSubmit={handleSubmit}>
      {({ isSubmitting, handleBlur, values, handleChange, errors, touched }) => (
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
              <TextField
                name="firstName"
                fullWidth
                placeholder="First name"
                label="First name"
                value={values.firstName}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.firstName && Boolean(errors.firstName)}
                helperText={(touched.firstName && errors.firstName) || ' '}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="lastName"
                fullWidth
                placeholder="Last name"
                label="Last name"
                value={values.lastName}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.lastName && Boolean(errors.lastName)}
                helperText={(touched.lastName && errors.lastName) || ' '}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="password"
                fullWidth
                placeholder="Password"
                label="Password"
                type="password"
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
                value={values.confirmation}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.confirmation && Boolean(errors.confirmation)}
                helperText={(touched.confirmation && errors.confirmation) || ' '}
              />
            </Grid>
            <Grid item xs={12}>
              <Button color={'primary'} variant="contained" fullWidth type="submit">
                Create account
              </Button>
              <Typography variant="body2" textAlign="center" paddingTop={2} paddingLeft={2}>
                By singing up, you agree to our{' '}
                <Link href="https://rakonto.io/terms-and-conditions" target="_blank">
                  terms
                </Link>{' '}
                and{' '}
                <Link href=" https://rakonto.io/privacy-policy" target="_blank">
                  {' '}
                  privacy policy
                </Link>
              </Typography>
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

export default Signup
