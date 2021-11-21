import React, { useContext } from 'react'
import { styled } from '@mui/material/styles'
import Button, { ButtonProps } from '@mui/material/Button'
import { blue } from '@mui/material/colors'
import FacebookIcon from '@mui/icons-material/Facebook'
// @ts-ignore
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import api from '../../../lib/api'
import Cookies from 'js-cookie'
import { SimpleSnackbarContext } from '../../../components/SimpleSnackbar'
import { useHistory } from 'react-router-dom'
import { parse } from 'qs'

const FacebookButton = styled(Button)<ButtonProps>(({ theme }) => ({
  color: theme.palette.getContrastText(blue[500]),
  backgroundColor: blue[500],
  '&:hover': {
    backgroundColor: blue[700]
  }
}))

FacebookButton.defaultProps = {
  startIcon: <FacebookIcon />,
  fullWidth: true,
  children: 'Sign in with facebook'
}

const Component = () => {
  const history = useHistory()
  // @ts-ignore
  const { returnUrl } = parse(location.search, { ignoreQueryPrefix: true })
  const { actions: snackActions } = React.useContext(SimpleSnackbarContext)

  const callback = async (resp: any) => {
    try {
      const userInfo = await api.signinFacebook({ token: resp.accessToken })
      Cookies.set('token', userInfo.token)
      Cookies.set('user', JSON.stringify(userInfo.user))
      if (returnUrl) {
        await history.push(returnUrl as string)
        return
      }
      await history.push('/a/my-library')
    } catch (error) {
      snackActions.open('Something was wrong! please try again.')
    }
  }
  return (
    <FacebookLogin
      appId={process.env.REACT_APP_FB_APP_ID || ''}
      // @ts-ignore
      render={({ onClick }) => <FacebookButton onClick={onClick} />}
      callback={callback}
    />
  )
}

export default Component
