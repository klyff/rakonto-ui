import React, { Fragment, useEffect, useState } from 'react'
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google'
import Cookies from 'js-cookie'
import { SimpleSnackbarContext } from '../../../components/SimpleSnackbar'
import api from '../../../lib/api'
import { useHistory } from 'react-router-dom'
import { parse } from 'qs'

const Component = () => {
  const history = useHistory()
  // @ts-ignore
  const [ready, setReady] = useState(false)
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
    <GoogleOAuthProvider onScriptLoadSuccess={() => setReady(true)} clientId={process.env.REACT_APP_GG_APP_ID || ''}>
      {ready && (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <GoogleLogin onSuccess={ok} />
        </div>
      )}
    </GoogleOAuthProvider>
  )
}

export default Component
