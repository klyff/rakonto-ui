import React, { useCallback, useState } from 'react'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'
import Typography from '@mui/material/Typography'
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord'
import { useStopwatch, useTimer } from 'react-timer-hook'
import { useReactMediaRecorder } from '../../MediaRecorder'
import redColor from '@mui/material/colors/red'
import useStateCallback from '../../hooks/useStateCallback'

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
  time.setSeconds(time.getSeconds() + countdown)
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

interface iWrapper {
  onDrop: (value: File | null) => void
  isRecordingType?: 'AUDIO' | 'VIDEO' | null
  countdown?: number
  onChangeRecordingType: () => void
}

const Recorder: React.FC<iWrapper> = ({ countdown, isRecordingType, onDrop, onChangeRecordingType }) => {
  const [showCountdown, setShowCountdown] = useStateCallback<boolean>(false)
  const [hideStartRecording, setHideStartRecording] = useStateCallback<boolean>(false)
  const { previewStream, previewAudioStream, status, startRecording, stopRecording, mediaBlobUrl, clearBlobUrl } =
    useReactMediaRecorder({
      video: isRecordingType === 'VIDEO',
      audio: true,
      onStop: (blobUrl: string, blob: Blob) => {
        onDrop(
          new File([blob], `Recorded.${isRecordingType === 'VIDEO' ? 'mp4' : 'wav'}`, {
            type: isRecordingType === 'VIDEO' ? 'video/mp4' : 'audio/wav'
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
            <VideoPreview stream={isRecordingType === 'VIDEO' ? previewStream : previewAudioStream} />
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
            {!mediaBlobUrl && (
              <Button size="large" variant="outlined" onClick={onChangeRecordingType}>
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
  )
}

export default Recorder
