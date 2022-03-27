import React from 'react'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Link from '@mui/material/Link'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'

const Error404 = () => {
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
        THE PAGE YOU WERE LOOKING FOR DOES NOT EXIST
      </Typography>
      <Link sx={{ textAlign: 'center', fontSize: '1.5em' }} href="/a/my-libary">
        Go to home
      </Link>
    </Box>
  )
}

export default Error404
