import React, { Fragment, useEffect } from 'react'
// @ts-ignore
import api from '../../../lib/api'
import Cookies from 'js-cookie'
import { SimpleSnackbarContext } from '../../../components/SimpleSnackbar'
import { useHistory } from 'react-router-dom'
import { parse } from 'qs'
import useScript from 'react-script-hook'

const Component = () => {
  const history = useHistory()
  // @ts-ignore
  const { returnUrl } = parse(location.search, { ignoreQueryPrefix: true })
  const { actions: snackActions } = React.useContext(SimpleSnackbarContext)
  const [_, error] = useScript({
    src: `https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v14.0&appId=${
      process.env.REACT_APP_FB_APP_ID || ''
    }&autoLogAppEvents=1`,
    nonce: 'VFrl1nvC',
    async: true,
    defer: true,
    crossorigin: 'anonymous'
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

  // @ts-ignore
  window.test = function () {
    // @ts-ignore
    window.FB.login(({ authResponse: { accessToken } }) => {
      callback(accessToken)
    })
  }

  return (
    <Fragment>
      {
        // @ts-ignore
        !error && window.FB && (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div id="fb-root"></div>
            <div
              className="fb-login-button"
              data-width=""
              data-size="large"
              data-button-type="login_with"
              data-layout="default"
              data-auto-logout-link="false"
              data-use-continue-as="true"
              data-onlogin="test"
            ></div>
          </div>
        )
      }
    </Fragment>
  )
}

export default Component
