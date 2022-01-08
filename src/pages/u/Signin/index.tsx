import React, { useContext } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { Form, Formik } from 'formik'
import schema from './schema'
import TextField from '@mui/material/TextField'
import LoadingButton from '@mui/lab/LoadingButton'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Link from '@mui/material/Link'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import { SigninFormType } from '../../../lib/types'
import api from '../../../lib/api'
import { SimpleDialogContext } from '../../../components/SimpleDialog'
import { SimpleSnackbarContext } from '../../../components/SimpleSnackbar'
import FacebookButton from './FacebookButton'
import GoogleButton from './GoogleButton'
import Cookies from 'js-cookie'
import { parse } from 'qs'

const Signin: React.FC<RouteComponentProps> = ({ location, history }) => {
  // @ts-ignore
  const { returnUrl } = parse(location.search, { ignoreQueryPrefix: true })
  const { actions: dialogActions } = useContext(SimpleDialogContext)
  const { actions: snackActions } = useContext(SimpleSnackbarContext)

  const handleResend = async (email: string) => {
    try {
      await api.requestConfirmEmail(email)
      dialogActions.close()
    } catch (error) {
      dialogActions.open(
        'Confirm email',
        <>
          This email has not confirmed. <br />
          In the next few minutes, we are sending another confirmation email.
          <br />
          Please, verify our email box and confirm it.
        </>
      )
    }
  }

  const handleSubmit = async ({ email, password }: SigninFormType) => {
    try {
      const userInfo = await api.signin({ email, password })
      Cookies.set('token', userInfo.token)
      Cookies.set('user', JSON.stringify(userInfo.user))
      if (returnUrl) {
        await history.push(returnUrl.toString())
        return
      }
      await history.push('/a/my-library')
    } catch (error) {
      // @ts-ignore
      if (error?.response?.status === 401) {
        snackActions.open('Email or password are incorrect. Please try again')
        return
      }
      // @ts-ignore
      const { data } = error
      if (data.code === '1004') {
        snackActions.open('Email or password are incorrect. Please try again')
        return
      }
      if (data.code === '1005') {
        dialogActions.open(
          'Verify Email',
          <>
            Please verify your email by clicking the link in the message we sent you.
            <br />
            <br />
            <Button color={'primary'} variant="contained" fullWidth onClick={() => handleResend(email)}>
              Resend email
            </Button>
          </>
        )
        return
      }
      snackActions.open('Something was wrong! please try again.')
    }
  }

  const initialValues: SigninFormType = { email: '', password: '' }
  return (
    <Formik initialValues={initialValues} validationSchema={schema} onSubmit={handleSubmit}>
      {({ isSubmitting, values, handleBlur, handleChange, errors, touched }) => {
        return (
          <Form>
            <Grid container spacing={4} direction="row" justifyContent="center" alignItems="center">
              <Grid item xs={12}>
                <TextField
                  size="medium"
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
                  size="medium"
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
                <LoadingButton
                  color={'primary'}
                  variant="contained"
                  loading={isSubmitting}
                  fullWidth
                  type="submit"
                  size="large"
                >
                  Login
                </LoadingButton>
                <Box textAlign="center" paddingTop={2.5}>
                  <Link href="/u/forgot-password">Forgot password?</Link>
                </Box>
              </Grid>
              {/* <Grid item xs={12}> */}
              {/*  <Divider>or</Divider> */}
              {/* </Grid> */}
              {/* <Grid item xs={12}> */}
              {/*  <FacebookButton /> */}
              {/* </Grid> */}
              {/* <Grid item xs={12}> */}
              {/*  <GoogleButton /> */}
              {/* </Grid> */}
              <Grid item xs={12}>
                <Divider />
              </Grid>
              <Grid item xs={12}>
                <LoadingButton href={'/u/signup'} variant="outlined" fullWidth>
                  Create new account
                </LoadingButton>
              </Grid>
            </Grid>
          </Form>
        )
      }}
    </Formik>
  )
}

export default Signin
