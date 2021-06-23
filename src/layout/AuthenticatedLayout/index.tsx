import React, { useEffect } from 'react'
import { useSetRecoilState } from 'recoil'
import Header from './NavBar'
import Sidebar from './Sidebar'
import { api } from '@root/api'

import { userState } from '@root/states/userState'
import { useMediaStatus } from '@root/hooks/useMediaStatus'

const AuthenticatedLayout: React.FC = ({ children }) => {
  const setUser = useSetRecoilState(userState)
  useMediaStatus()

  useEffect(() => {
    const get = async () => {
      const user = await api.getMe()
      setUser(user)
    }
    get()
  }, [])

  return (
    <>
      <Header />
      <Sidebar>{children}</Sidebar>
    </>
  )
}

export default AuthenticatedLayout
