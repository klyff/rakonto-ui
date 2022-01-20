import React, { useCallback } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'
import Typography from '@mui/material/Typography'
import MovieIcon from '@mui/icons-material/Movie'
import HeadphonesIcon from '@mui/icons-material/Headphones'
import { useReactMediaRecorder } from '../MediaRecorder'
import CameraIndoorIcon from '@mui/icons-material/CameraIndoor'
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord'
import { useStopwatch } from 'react-timer-hook'

const VideoPreview = ({ stream }: { stream: MediaStream | null }) => {
  const videoRef = useCallback(node => {
    if (node && stream) {
      node.srcObject = stream
    }
  }, [])

  if (!stream) {
    return null
  }
  return <video height="100%" width="auto" ref={videoRef} autoPlay muted={true} />
}

interface iRecorder {
  onSelected: (value: 'AUDIO' | 'VIDEO' | null) => void
  onDrop: (value: File | null) => void
  type?: 'AUDIO' | 'VIDEO' | null
}

const Recorder: React.FC<iRecorder> = ({ onSelected, type, onDrop }) => {
  const { seconds, minutes, hours, reset, start, pause } = useStopwatch({ autoStart: false })
  const { previewStream, previewAudioStream, status, startRecording, stopRecording, mediaBlobUrl, clearBlobUrl } =
    useReactMediaRecorder({
      video: type === 'VIDEO',
      audio: true,
      onStop: (blobUrl: string, blob: Blob) => {
        onDrop(
          new File([blob], `Recorded.${type === 'VIDEO' ? 'mp4' : 'wav'}`, {
            type: type === 'VIDEO' ? 'video/mp4' : 'audio/wav'
          })
        )
      }
    })
  return (
    <>
      {!type && (
        <Box
          sx={{
            width: 422,
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
              Record video or audio from your device
            </Typography>
            <ButtonGroup disableElevation size="large" variant="outlined">
              <Button onClick={() => onSelected('VIDEO')} startIcon={<MovieIcon />}>
                Video
              </Button>
              <Button onClick={() => onSelected('AUDIO')} endIcon={<HeadphonesIcon />}>
                Audio
              </Button>
            </ButtonGroup>
          </Box>
        </Box>
      )}
      {type && (
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            height: 422,
            border: '1px solid #7b7b7c',
            borderRadius: '20px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexFlow: 'column'
          }}
        >
          {status === 'recording' ? (
            <>
              <Box
                sx={{
                  position: 'absolute',
                  top: 16,
                  right: 16,
                  color: 'red'
                }}
              >
                <Box sx={{ textAlign: 'center', animation: 'blink 2s ease-in infinite' }}>
                  <FiberManualRecordIcon />
                </Box>
                <Typography>{`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds
                  .toString()
                  .padStart(2, '0')}`}</Typography>
              </Box>
              <Box
                sx={{
                  position: 'absolute',
                  bottom: 16,
                  right: 16,
                  zIndex: '1000'
                }}
              >
                <Button
                  size="large"
                  variant="outlined"
                  onClick={() => {
                    stopRecording()
                    pause()
                    reset()
                  }}
                >
                  Stop recording
                </Button>
              </Box>
              <VideoPreview stream={type === 'VIDEO' ? previewStream : previewAudioStream} />
            </>
          ) : (
            mediaBlobUrl && <video height={'100%'} width="auto" src={mediaBlobUrl} controls autoPlay />
          )}

          <Box sx={{ position: 'absolute' }}>
            {status === 'idle' && (
              <ButtonGroup disableElevation size="large" variant="outlined">
                <Button
                  size="large"
                  variant="outlined"
                  onClick={() => {
                    startRecording()
                    start()
                  }}
                >
                  Start recording
                </Button>
                {!mediaBlobUrl && (
                  <Button
                    size="large"
                    variant="outlined"
                    onClick={() => {
                      onSelected(null)
                    }}
                  >
                    Change recording type
                  </Button>
                )}
              </ButtonGroup>
            )}
            {status === 'stopped' && mediaBlobUrl && (
              <Button
                variant="contained"
                size="large"
                onClick={() => {
                  clearBlobUrl()
                  onDrop(null)
                }}
              >
                Discard
              </Button>
            )}
          </Box>
        </Box>
      )}
    </>
  )
}

export default Recorder
