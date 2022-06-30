import ButtonGroup from '@mui/material/ButtonGroup'
import Button from '@mui/material/Button'
import MovieIcon from '@mui/icons-material/Movie'
import HeadphonesIcon from '@mui/icons-material/Headphones'
import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

interface iMobileUpload {
  onDrop: (value: File | null) => void
  filter?: 'AUDIO' | 'VIDEO' | null
}

const MobileUpload: React.FC<iMobileUpload> = ({ onDrop, filter }) => {
  const handleCapture = (files: FileList | null) => {
    if (files) {
      if (files.length !== 0) {
        onDrop(files[0])
      }
    }
  }

  return (
    <Box
      sx={{
        width: { xs: '100%', md: 422 },
        height: 300,
        border: '1px dashed #7b7b7c',
        borderRadius: '20px'
      }}
    >
      <Box
        sx={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexFlow: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '0px 85px'
        }}
      >
        <Typography sx={{ marginBottom: 6 }} fontWeight="700" align="center" variant="h6" gutterBottom>
          {`Record ${!filter ? 'video or audio' : filter.toLowerCase()} from your device`}
        </Typography>
        <ButtonGroup disableElevation size="large" variant="outlined">
          {(!filter || filter === 'VIDEO') && (
            <Button component="label" startIcon={<MovieIcon />}>
              Video{' '}
              <input
                accept="video/*;capture=camcorder"
                type="file"
                onChange={e => handleCapture(e.target?.files)}
                hidden
                capture="user"
              />
            </Button>
          )}
          {(!filter || filter === 'AUDIO') && (
            <Button component="label" endIcon={<HeadphonesIcon />}>
              Audio
              <input
                accept="audio/*;capture=microphone"
                type="file"
                onChange={e => handleCapture(e.target?.files)}
                hidden
                capture="user"
              />
            </Button>
          )}
        </ButtonGroup>
      </Box>
    </Box>
  )
}

export default MobileUpload
