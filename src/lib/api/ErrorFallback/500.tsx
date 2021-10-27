import React from 'react'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import Link from '@mui/material/Link'

const ServerError: React.FC<{ onCallback: () => void }> = ({ onCallback }) => {
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
        Oops, something went wrong.
      </Typography>
      <Typography gutterBottom align="center" variant="h5">
        Try to refresh this page or fell free to contact us if the problem persists.
      </Typography>
      <Link
        sx={{ textAlign: 'center', fontSize: '1.5em' }}
        onClick={() => {
          window.location.reload()
        }}
      >
        Refresh
      </Link>
    </Box>
  )
}

export default ServerError