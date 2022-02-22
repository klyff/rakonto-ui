import React from 'react'
import Header from './Header'

const GuestLayout: React.FC = ({ children }) => {
  return (
    <>
      <Header />
      {children}
    </>
  )
}

export default GuestLayout
