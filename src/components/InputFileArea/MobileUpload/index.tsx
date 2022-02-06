import ButtonGroup from '@mui/material/ButtonGroup'
import Button from '@mui/material/Button'
import MovieIcon from '@mui/icons-material/Movie'
import HeadphonesIcon from '@mui/icons-material/Headphones'
import React from 'react'
import Box from '@mui/material/Box'
import UploadFileIcon from '@mui/icons-material/UploadFile'
import Typography from '@mui/material/Typography'
import CameraIndoorIcon from '@mui/icons-material/CameraIndoor'

interface iMobileUpload {
  onDrop: (value: File | null) => void
  file: File | null
  onRemove: () => void
}

const MobileUpload: React.FC<iMobileUpload> = ({ onDrop, file, onRemove }) => {
  const handleCapture = (files: FileList | null) => {
    if (files) {
      if (files.length !== 0) {
        onDrop(files[0])
      }
    }
  }

  return (
    <>
      {file && (
        <Box
          sx={{
            display: 'flex',
            flexFlow: 'column'
          }}
        >
          <Box
            component="div"
            sx={{
              height: 422,
              display: 'flex',
              flexFlow: 'column',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Box
              sx={{
                width: 72,
                height: 72,
                borderRadius: 50,
                backgroundColor: 'primary.main',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: 2
              }}
            >
              <UploadFileIcon
                sx={{
                  fontSize: 52,
                  color: 'common.black'
                }}
              />
            </Box>
            <Typography fontWeight="700" align="center" variant="h5" gutterBottom>
              {file.name}
            </Typography>
            <Button onClick={onRemove}>Remove</Button>
          </Box>
        </Box>
      )}
      {!file && (
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
              Record video or audio from your device
            </Typography>
            <ButtonGroup disableElevation size="large" variant="outlined">
              <Button component="label" startIcon={<MovieIcon />}>
                Video <input accept="video/*" type="file" onChange={e => handleCapture(e.target?.files)} hidden />
              </Button>
              <Button component="label" endIcon={<HeadphonesIcon />}>
                Audio
                <input accept="audio/*" type="file" onChange={e => handleCapture(e.target?.files)} hidden />
              </Button>
            </ButtonGroup>
          </Box>
        </Box>
      )}
    </>
  )
}

export default MobileUpload
