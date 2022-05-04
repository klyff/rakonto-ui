import React, { useCallback, useState } from 'react'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'
import Typography from '@mui/material/Typography'
import MovieIcon from '@mui/icons-material/Movie'
import HeadphonesIcon from '@mui/icons-material/Headphones'
import CameraIndoorIcon from '@mui/icons-material/CameraIndoor'
import Wrapper from './Wrapper'

interface iRecorder {
  onSelected?: (isSelected: boolean) => void
  onDrop: (value: File | null) => void
  type?: 'AUDIO' | 'VIDEO' | null
  disableChangeMediaType?: boolean
  countdown?: number
  clearMedia?: () => void
}

const Recorder: React.FC<iRecorder> = ({ onSelected, type, clearMedia, onDrop, disableChangeMediaType, countdown }) => {
  const [isRecordingType, setIsRecordingType] = useState<'AUDIO' | 'VIDEO' | null>(null)

  const handleSelectType = (type: 'AUDIO' | 'VIDEO' | null) => {
    setIsRecordingType(type)
    onSelected && onSelected(true)
  }

  return (
    <>
      {!isRecordingType && (
        <Box
          sx={{
            width: { xs: '100%', md: 422 },
            height: 422,
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
              <CameraIndoorIcon
                sx={{
                  fontSize: 52,
                  color: 'common.black'
                }}
              />
            </Box>
            <Typography sx={{ marginBottom: 6 }} fontWeight="700" align="center" variant="h6" gutterBottom>
              {`Record ${!type ? 'video or audio' : type.toLowerCase()} from your device`}
            </Typography>
            <ButtonGroup disableElevation size="large" variant="outlined">
              {(!type || type === 'VIDEO') && (
                <Button onClick={() => handleSelectType('VIDEO')} startIcon={<MovieIcon />}>
                  Video
                </Button>
              )}
              {(!type || type === 'AUDIO') && (
                <Button onClick={() => handleSelectType('AUDIO')} endIcon={<HeadphonesIcon />}>
                  Audio
                </Button>
              )}
            </ButtonGroup>
          </Box>
        </Box>
      )}
      {isRecordingType && (
        <Wrapper
          onDrop={onDrop}
          isRecordingType={isRecordingType}
          countdown={countdown}
          onChangeRecordingType={() => {
            setIsRecordingType(null)
            onSelected && onSelected(false)
          }}
        />
      )}
    </>
  )
}

export default Recorder
