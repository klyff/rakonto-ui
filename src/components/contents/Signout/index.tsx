import React, { useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { useSetRecoilState } from 'recoil'
import { userState } from '@root/states/userState'
import { api } from '@root/api'

const Signout: React.FC = () => {
  const setUser = useSetRecoilState(userState)

  useEffect(() => {
    api.singout()
    setUser(null)
    localStorage.removeItem('token')
  }, [])

  return <Redirect to="/u/signin" />
}

export default Signout
