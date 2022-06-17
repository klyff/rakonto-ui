import React from 'react'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Link from '@mui/material/Link'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'

const Error500 = () => {
  return (
    <Box
      sx={{
        position: 'absolute',
        maxWidth: '100%',
        width: '100%',
        minHeight: 755,
        padding: `32px 5vw`,
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        borderRadius: '20px',
        display: 'flex',
        flexFlow: 'column'
      }}
    >
      <Box sx={{ textAlign: 'center' }}>
        <ErrorOutlineIcon sx={{ fontSize: '10em' }} />
      </Box>
      <Typography gutterBottom variant="h2" align="center">
        Sorry!
      </Typography>
      <Typography gutterBottom align="center" variant="h5">
        Oops, something went wrong. Please try again later.
      </Typography>
    </Box>
  )
}

export default Error500
