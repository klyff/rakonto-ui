import React from 'react'
import Header from './Header'
import Box from '@mui/material/Box'
import { useTheme } from '@mui/material/styles'

const GuestLayout: React.FC<{ logo: string; isLoading: boolean; showPoweredByLogo: boolean }> = ({
  logo,
  isLoading,
  showPoweredByLogo,
  children
}) => {
  const theme = useTheme()
  return (
    <>
      <Header logo={logo} isLoading={isLoading} />
      <Box
        sx={{
          width: '100%',
          marginBottom: 2,
          overflow: 'auto',
          height: {
            xs: 'calc(100% - 56px)',
            sm: 'calc(100% - 64px)'
          }
        }}
      >
        {children}
      </Box>
      {showPoweredByLogo && (
        <Box
          component="a"
          href="/"
          sx={{ position: 'fixed', bottom: '16px', left: '16px', zIndex: theme.zIndex.tooltip }}
        >
          <img width={135} src={'/images/poweredByRakonto.png'} alt="rakonto" />
        </Box>
      )}
    </>
  )
}

export default GuestLayout
