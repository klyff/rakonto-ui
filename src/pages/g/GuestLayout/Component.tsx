import React from 'react'
import Header from './Header'
import Box from '@mui/material/Box'

const GuestLayout: React.FC<{ logo: string; isLoading: boolean }> = ({ logo, isLoading, children }) => {
  return (
    <>
      <Header logo={logo} isLoading={isLoading} />
      <Box
        sx={{
          width: '100%',
          marginBottom: 2,
          overflow: 'auto',
          height: {
            xs: 'calc(100vh - 56px)',
            sm: 'calc(100vh - 64px)'
          }
        }}
      >
        {}
        {children}
      </Box>
    </>
  )
}

export default GuestLayout
