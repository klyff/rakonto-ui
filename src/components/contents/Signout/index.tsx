import React, { useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { useSetRecoilState } from 'recoil'
import { userState } from '@root/states/userState'

const Signout: React.FC = () => {
  const setUser = useSetRecoilState(userState)

  useEffect(() => {
    setUser(null)
    localStorage.removeItem('token')
  }, [])

  return <Redirect to="/u/signin" />
}

export default Signout
