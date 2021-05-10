import React from 'react'
import Header from './NavBar'
import Content from './Content'
import Sidebar from './Sidebar'

const AuthenticatedLayout: React.FC = ({ children }) => {
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
