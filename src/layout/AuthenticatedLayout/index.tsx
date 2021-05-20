import React, { useEffect } from 'react'
import { useSetRecoilState } from 'recoil'
import Header from './NavBar'
import Content from './Content'
import Sidebar from './Sidebar'
import { api } from '@root/api'

import { userState } from '@root/states/userState'

const AuthenticatedLayout: React.FC = ({ children }) => {
  const setUser = useSetRecoilState(userState)

  useEffect(() => {
    const get = async () => {
      const user = await api.getMe()
      setUser(user)
    }
    get()
  }, [])

  return (
    <div
      style={{
        height: '100vh'
      }}
    >
      <Header />
      <Sidebar>
        <Content>{children}</Content>
      </Sidebar>
    </div>
  )
}

export default AuthenticatedLayout
