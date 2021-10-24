import React, { useEffect } from 'react'
import { api } from '../../../lib/api'
import { RouteProps, useHistory } from 'react-router-dom'
import Cookies from 'js-cookie'

const Signout: React.FC<RouteProps> = () => {
  const history = useHistory()

  useEffect(() => {
    const doLogout = async () => {
      await api.singout()
      Cookies.remove('user')
      Cookies.remove('token')
      history.push('/u/signin')
    }
    doLogout()
  }, [])

  return null
}

export default Signout
