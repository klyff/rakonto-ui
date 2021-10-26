import React from 'react'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'

const CircularLoadingCentred: React.FC = () => {
  return (
    <Box
      sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
      }}
    >
      <CircularProgress size={60} />
    </Box>
  )
}

export default CircularLoadingCentred
