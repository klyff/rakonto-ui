import React, { useEffect, useContext } from 'react'
import api from '../../../lib/api'
import { RouteProps, useHistory } from 'react-router-dom'
import Cookies from 'js-cookie'

const Signout: React.FC<RouteProps> = () => {
  const history = useHistory()

  useEffect(() => {
    const doLogout = async () => {
      Cookies.remove('user')
      Cookies.remove('token')
      history.push('/u/signin')
      api.singout()
    }
    doLogout()
  }, [])

  return null
}

export default Signout
