import React, { Fragment, useEffect } from 'react'
// @ts-ignore
import api from '../../../lib/api'
import Cookies from 'js-cookie'
import { SimpleSnackbarContext } from '../../../components/SimpleSnackbar'
import { useHistory } from 'react-router-dom'
import { parse } from 'qs'
import useScript from 'react-script-hook'

const Component = React.memo(() => {
  const history = useHistory()
  // @ts-ignore
  const { returnUrl } = parse(location.search, { ignoreQueryPrefix: true })
  const { actions: snackActions } = React.useContext(SimpleSnackbarContext)
  const [ready, error] = useScript({
    src: `https://connect.facebook.net/en_US/sdk.js?t=${Date.now()}`,
    async: true,
    defer: true,
    crossorigin: 'anonymous',
    id: 'facebook-jssdk'
  })

  const callback = async (accessToken: string) => {
    try {
      const userInfo = await api.signinFacebook({ token: accessToken })
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

  useEffect(() => {
    // @ts-ignore
    if (!window.FB) {
      return
    }

    // @ts-ignore
    window.FB.init({
      appId: process.env.REACT_APP_FB_APP_ID,
      autoLogAppEvents: true,
      xfbml: true,
      version: 'v14.0'
    })

    // @ts-ignore
    window.fbcallback = function () {
      // @ts-ignore
      window.FB.getLoginStatus((response: any) => {
        if (response.status === 'connected') {
          callback(response.authResponse.accessToken)
        }
      })
    }

    return () => {
      // @ts-ignore
      window.fbcallback = null
      // @ts-ignore
      window.FB = null
      // @ts-ignore
      window.document.getElementById('facebook-jssdk')?.remove()
    }
    // @ts-ignore
  }, [window.FB])

  return (
    <div style={{ display: 'flex', justifyContent: 'center', minWidth: '228px', minHeight: '40px' }}>
      {
        // @ts-ignore
        !error && window.FB && (
          <Fragment>
            <div id="fb-root"></div>
            <div
              className="fb-login-button"
              data-width=""
              data-size="large"
              data-button-type="login_with"
              data-layout="default"
              data-auto-logout-link="false"
              data-use-continue-as="true"
              data-onlogin="fbcallback"
              data-scope="public_profile, email"
            ></div>
          </Fragment>
        )
      }
    </div>
  )
})

export default Component
