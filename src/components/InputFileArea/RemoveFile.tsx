import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import React from 'react'
import Player from '../Player'
import Link from '@mui/material/Link'
import { Link as RouterLink } from 'react-router-dom'

interface RemoveFile {
  file: File
  onRemove: () => void
  onSubscriptionClicked?: () => void
  quotaError: boolean
}

const RemoveFile: React.FC<RemoveFile> = ({ file, onRemove, quotaError, onSubscriptionClicked }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexFlow: 'column',
        width: '100%'
      }}
    >
      {quotaError && (
        <Typography color="error" mb="unset" fontWeight="700" align="center" variant="subtitle1" gutterBottom>
          You have exceeded your total library capacity.{' '}
          <Link
            to="/a/profile?tab=subscription"
            component={RouterLink}
            onClick={() => {
              if (onSubscriptionClicked) {
                onSubscriptionClicked()
              }
            }}
          >
            Upgrade my plan.
          </Link>
        </Typography>
      )}
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          alignItems: 'center'
        }}
      >
        <Typography mb="unset" fontWeight="700" align="center" variant="subtitle1" gutterBottom>
          {file.name}
        </Typography>
        <Box flex={1} />
        <Box>
          <Button onClick={onRemove}>Re-record</Button>
        </Box>
      </Box>
      <Player maxHeight="520px" subtitles={[]} type={'VIDEO'} media={{ id: 'local', url: URL.createObjectURL(file) }} />
    </Box>
  )
}

export default RemoveFile
