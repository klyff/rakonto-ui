import React, { useContext, useEffect } from 'react'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { FormikValues } from 'formik'
import schema from './schema'
import { ApiContext } from '../../../lib/api'
import { SimpleDialogContext } from '../../../components/SimpleDialog'
import { SimpleSnackbarContext } from '../../../components/SimpleSnackbar'
import { FormDialogContext } from '../../../components/FormDialog'
import Cookies from 'js-cookie'
import { RouteComponentProps } from 'react-router-dom'
import { parse } from 'qs'

const ConfirmationEmail: React.FC<RouteComponentProps> = ({ location, history }) => {
  const { api } = useContext(ApiContext)
  const { token: confirmationToken } = parse(location?.search as string, { ignoreQueryPrefix: true })
  const { actions: dialogActions } = useContext(SimpleDialogContext)
  const { actions: snackActions } = useContext(SimpleSnackbarContext)
  const { actions: formDialogActions } = useContext(FormDialogContext)
  const handleSubmit = async ({ email }: FormikValues) => {
    try {
      await api().requestConfirmEmail(email)
      dialogActions.open('Confirm email', <>We sent an email to you to confirm your account. Please check this.</>)
      history.push('/u/signin')
    } catch (error) {
      history.push('/u/signin')
    }
  }

  useEffect(() => {
    if (!confirmationToken) return
    const confirm = async () => {
      try {
        const userInfo = await api().confirmEmail(confirmationToken as string)
        Cookies.set('token', userInfo.token)
        Cookies.set('user', JSON.stringify(userInfo.user))
        history.push('/a/my-library')
      } catch (error) {
        // @ts-ignore
        const { data } = error
        if (data.code === '1003') {
          formDialogActions.open(
            'Expired link',
            'This link has expired. Please enter your email address to resend another link to you to confirm your account.',
            [{ name: 'email', placeholder: 'Email address', label: 'Email address' }],
            { email: '' },
            schema,
            handleSubmit,
            { okText: 'Submit', cancelText: 'Close' }
          )
        }
        if (data.code === '1002') {
          // TODO TypeError
          dialogActions.open(
            'Confirm email',
            <>
              This token not found. if you have registered, please try to login to request another confirmation email.
            </>,
            { cancelText: 'Ok' }
          )
          history.push('/u/signin')
        }

        snackActions.open('Something was wrong! please try again.')
      }
    }
    confirm()
  }, [confirmationToken])

  return (
    <Box width="100%" height="40vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <CircularProgress />
      <Typography>Validating...</Typography>
    </Box>
  )
}

export default ConfirmationEmail
