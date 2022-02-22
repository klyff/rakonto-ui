import React from 'react'
import { Link } from 'react-router-dom'
import useMediaQuery from '@mui/material/useMediaQuery'
import Container from '@mui/material/Container'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'

const PublicLayout: React.FC = ({ children }) => {
  const matches = useMediaQuery('(min-width:769px)')
  return (
    <Container>
      <Box
        sx={{
          position: 'absolute',
          maxWidth: matches ? 684 : '100%',
          width: '100%',
          minHeight: 755,
          padding: `72px 5vw`,
          top: '80px',
          left: '50%',
          transform: 'translate(-50%, 0%)',
          borderRadius: '20px'
        }}
        component={matches ? Paper : 'div'}
      >
        <Box paddingBottom={5} textAlign="center">
          <Link to="/">
            <img width={211} height={62} src={'/images/logo2.svg'} alt="rakonto" />
          </Link>
        </Box>
        {children}
      </Box>
    </Container>
  )
}

export default PublicLayout
