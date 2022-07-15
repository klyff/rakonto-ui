import React from 'react'
import { GoogleLogin } from '@react-oauth/google'
import Cookies from 'js-cookie'
import { SimpleSnackbarContext } from '../../../components/SimpleSnackbar'
import api from '../../../lib/api'
import { useHistory } from 'react-router-dom'
import { parse } from 'qs'

const Component = () => {
  const history = useHistory()
  // @ts-ignore
  const { returnUrl } = parse(location.search, { ignoreQueryPrefix: true })
  const { actions: snackActions } = React.useContext(SimpleSnackbarContext)

  const ok = async (resp: any) => {
    try {
      const userInfo = await api.signinGoogle({ token: resp.credential })
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
    <div style={{ display: 'flex', justifyContent: 'center', minWidth: '228px', minHeight: '40px' }}>
      <GoogleLogin onSuccess={ok} />
    </div>
  )
}

export default Component
