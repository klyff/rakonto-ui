import React, { useEffect, useContext } from 'react'
import { ApiContext } from '../../../lib/api'
import { RouteProps, useHistory } from 'react-router-dom'
import Cookies from 'js-cookie'

const Signout: React.FC<RouteProps> = () => {
  const { api } = useContext(ApiContext)
  const history = useHistory()

  useEffect(() => {
    const doLogout = async () => {
      await api().singout()
      Cookies.remove('user')
      Cookies.remove('token')
      history.push('/u/signin')
    }
    doLogout()
  }, [])

  return null
}

export default Signout
