import React, { useContext } from 'react'
import { styled } from '@mui/material/styles'
import Button, { ButtonProps } from '@mui/material/Button'
import GoogleIcon from '@mui/icons-material/Google'
import { alpha, darken } from '@mui/system'
import GoogleLogin from 'react-google-login'
import Cookies from 'js-cookie'
import { SimpleSnackbarContext } from '../../../components/SimpleSnackbar'
import { ApiContext } from '../../../lib/api'
import { useHistory } from 'react-router-dom'
import { parse } from 'qs'

const GoogleButton = styled(Button)<ButtonProps>(({ theme }) => ({
  color: theme.palette.common.white,
  border: `1px solid ${theme.palette.common.white}`,
  '&:hover': {
    color: darken(theme.palette.common.white, 0.15),
    border: `1px solid ${darken(theme.palette.common.white, 0.15)}`,
    backgroundColor: alpha(theme.palette.common.white, theme.palette.action.hoverOpacity)
  }
}))

GoogleButton.defaultProps = {
  startIcon: <GoogleIcon />,
  variant: 'outlined',
  fullWidth: true,
  children: 'Sign in with google'
}

const Component = () => {
  const { api } = useContext(ApiContext)
  const history = useHistory()
  // @ts-ignore
  const { returnUrl } = parse(location.search, { ignoreQueryPrefix: true })
  const { actions: snackActions } = React.useContext(SimpleSnackbarContext)

  const callback = async (resp: any) => {
    try {
      const userInfo = await api().signinGoogle({ token: resp.tokenId })
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
    <GoogleLogin
      render={renderProps => <GoogleButton onClick={renderProps.onClick} />}
      clientId={process.env.REACT_APP_GG_APP_ID || ''}
      onSuccess={callback}
      cookiePolicy={'single_host_origin'}
    />
  )
}

export default Component
