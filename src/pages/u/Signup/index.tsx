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
import { ApiContext } from '../../../lib/api'
import { RouteComponentProps } from 'react-router-dom'

const Signup: React.FC<RouteComponentProps> = ({ history }) => {
  const { api } = useContext(ApiContext)
  const { actions: dialogActions } = useContext(SimpleDialogContext)
  const { actions: snackActions } = useContext(SimpleSnackbarContext)

  const handleSubmit = async ({ email, firstName, lastName, password, confirmation }: SingupFormType) => {
    try {
      await api().singup({ email, firstName, lastName, password, confirmation })
      history.push('/u/signin')
      dialogActions.open('Confirm email', 'We sent an email to you to confirm your account. Please check this.', {
        cancelText: 'Close'
      })
    } catch (error) {
      console.log(error)
      // @ts-ignore
      let { data } = error
      if (data) {
        data = JSON.parse(data)
        if (data.code === '1001') {
          snackActions.open('Email is already taken.')
          return
        }
        snackActions.open(data.message)
      }
      snackActions.open('Something was wrong! please try again.')
    }
  }

  const initialValues: SingupFormType = { email: '', password: '', confirmation: '', firstName: '', lastName: '' }
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
                placeholder="First Name"
                label="First Name"
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
                placeholder="Last Name"
                label="Last Name"
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
                placeholder="Confirmation password"
                label="Confirmation password"
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
