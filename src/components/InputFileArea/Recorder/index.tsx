import React, { useCallback, useState } from 'react'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'
import Typography from '@mui/material/Typography'
import MovieIcon from '@mui/icons-material/Movie'
import HeadphonesIcon from '@mui/icons-material/Headphones'
import CameraIndoorIcon from '@mui/icons-material/CameraIndoor'
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord'
import { useStopwatch, useTimer } from 'react-timer-hook'
import { useReactMediaRecorder } from '../../MediaRecorder'
import useStateCallback from '../../hooks/useStateCallback'
import redColor from '@mui/material/colors/red'

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

const CountDown: React.FC<{ expire: () => void }> = ({ expire }) => {
  const time = new Date()
  time.setSeconds(time.getSeconds() + 3)
  const { seconds } = useTimer({
    expiryTimestamp: time,
    autoStart: true,
    onExpire: expire
  })
  return (
    <Stack spacing={2} direction="column" alignItems="center">
      <Typography
        variant="h4"
        sx={{
          color: redColor.A100
        }}
      >
        Starting
      </Typography>
      <Typography
        variant="h3"
        sx={{
          color: redColor.A100
        }}
      >
        {seconds}
      </Typography>
    </Stack>
  )
}

const useCountDown = (countdown = 0, expire?: () => void) => {
  const time = new Date()
  time.setSeconds(time.getSeconds() + countdown * 60)
  const timer = useTimer({
    expiryTimestamp: time,
    autoStart: false,
    onExpire: expire
  })
  const stopwatch = useStopwatch({ autoStart: false })

  const current = countdown ? timer : stopwatch
  const Component = () => (
    <Typography>{`${current.hours.toString().padStart(2, '0')}:${current.minutes
      .toString()
      .padStart(2, '0')}:${current.seconds.toString().padStart(2, '0')}`}</Typography>
  )
  return {
    reset: countdown ? () => timer.restart(time, false) : stopwatch.reset,
    start: current.start,
    pause: current.pause,
    Component
  }
}

interface iRecorder {
  onSelected?: (value: 'AUDIO' | 'VIDEO' | null) => void
  onDrop: (value: File | null) => void
  type?: 'AUDIO' | 'VIDEO' | null
  disableChangeMediaType?: boolean
  countdown?: number
}

const Recorder: React.FC<iRecorder> = ({ onSelected, type, onDrop, disableChangeMediaType, countdown }) => {
  const [showCountdown, setShowCountdown] = useStateCallback<boolean>(false)
  const [hideStartRecording, setHideStartRecording] = useStateCallback<boolean>(false)

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

  const { Component, start, pause, reset } = useCountDown(countdown, stopRecording)

  const handleExpire = () => {
    // @ts-ignore
    setShowCountdown(false, () => {
      // @ts-ignore
      setHideStartRecording(false)
      startRecording()
      start()
    })
  }

  const handleStart = () => {
    // @ts-ignore
    setHideStartRecording(true, () => {
      // @ts-ignore
      setShowCountdown(true)
    })
  }

  return (
    <>
      {!type && (
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
              Record video or audio from your device
            </Typography>
            {onSelected && (
              <ButtonGroup disableElevation size="large" variant="outlined">
                <Button onClick={() => onSelected('VIDEO')} startIcon={<MovieIcon />}>
                  Video
                </Button>
                <Button onClick={() => onSelected('AUDIO')} endIcon={<HeadphonesIcon />}>
                  Audio
                </Button>
              </ButtonGroup>
            )}
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
          <>
            {!showCountdown && status === 'recording' ? (
              <>
                <Box
                  sx={{
                    position: 'absolute',
                    top: 16,
                    right: 16,
                    color: redColor.A100
                  }}
                >
                  <Box sx={{ textAlign: 'center', animation: 'blink 2s ease-in infinite' }}>
                    <FiberManualRecordIcon />
                  </Box>
                  <Component />
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
          </>
          <Box sx={{ position: 'absolute' }}>
            {showCountdown && <CountDown expire={handleExpire} />}
            {!hideStartRecording && status === 'idle' && (
              <ButtonGroup disableElevation size="large" variant="outlined">
                <Button size="large" variant="outlined" onClick={handleStart}>
                  Start recording
                </Button>
                {!disableChangeMediaType && !mediaBlobUrl && onSelected && (
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
