import React, { useCallback, useEffect, useRef } from 'react'
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
import MenuItem from '@mui/material/MenuItem'
import Menu from '@mui/material/Menu'
import IconButton from '@mui/material/IconButton'
import SettingsIcon from '@mui/icons-material/Settings'
import Divider from '@mui/material/Divider'
import useAudioAnalyser from './useAudioAnalyzer'

const AudioPreview = ({ stream }: { stream: MediaStream | null }) => {
  const analyser = useAudioAnalyser(stream)
  const visualizerRef = useRef<HTMLCanvasElement>(null)
  const boxRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!analyser) {
      return
    }
    let raf: number

    const data = new Uint8Array(analyser.frequencyBinCount)

    const draw = () => {
      raf = requestAnimationFrame(draw)
      analyser.getByteTimeDomainData(data)
      const canvas = visualizerRef.current

      if (canvas) {
        const { height, width } = canvas
        const context = canvas.getContext('2d')
        let x = 0
        const sliceWidth = (width * 1.0) / data.length

        if (context) {
          context.lineWidth = 2
          context.strokeStyle = '#fff'
          context.clearRect(0, 0, width, height)

          context.beginPath()
          context.moveTo(0, height / 2)
          // @ts-ignore
          for (const item of data) {
            const y = (item / 255.0) * height
            context.lineTo(x, y)
            x += sliceWidth
          }
          context.lineTo(x, height / 2)
          context.stroke()
        }
      }
    }
    draw()

    return () => {
      cancelAnimationFrame(raf)
    }
  }, [visualizerRef, analyser])

  return (
    <Box
      ref={boxRef}
      sx={{
        width: '100%',
        overflow: 'hidden'
      }}
    >
      {analyser && <canvas ref={visualizerRef} width={850} />}
    </Box>
  )
}

const VideoPreview = ({ stream }: { stream: MediaStream | null }) => {
  const videoRef = useCallback(node => {
    if (node && stream) {
      if (window.URL) {
        node.srcObject = stream
      } else {
        node.src = stream
      }
    }
  }, [])

  if (!stream) {
    return null
  }
  return <video height="100%" width="auto" ref={videoRef} autoPlay muted playsInline />
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
  const {
    previewStream,
    status,
    startRecording,
    stopRecording,
    mediaBlobUrl,
    clearBlobUrl,
    devices,
    currentDevices,
    switchDevice
  } = useReactMediaRecorder({
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

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

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
        {(status === 'idle' || status === 'recording') &&
          (isRecordingType === 'VIDEO' ? (
            <VideoPreview stream={previewStream} />
          ) : (
            <AudioPreview stream={previewStream} />
          ))}
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
          </>
        ) : (
          mediaBlobUrl && <video height={'100%'} width="auto" src={mediaBlobUrl} controls autoPlay />
        )}
      </>
      <Box sx={{ position: 'absolute', width: '100%', height: '100%' }}>
        {showCountdown && (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%'
            }}
          >
            <CountDown expire={handleExpire} />
          </Box>
        )}
        {!hideStartRecording && status === 'idle' && (
          <>
            <Box
              sx={{
                position: 'absolute',
                bottom: '10px',
                left: '50%',
                transform: 'translate(-50%)'
              }}
            >
              <Button
                onClick={handleClick}
                variant="contained"
                color="secondary"
                size="large"
                sx={{ ml: 2 }}
                aria-controls={open ? 'account-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                endIcon={<SettingsIcon />}
              >
                Select your devices
              </Button>
              <Menu anchorEl={anchorEl} id="account-menu" open={open} onClose={handleClose} onClick={handleClose}>
                <MenuItem disabled>Audio</MenuItem>
                {devices
                  .filter(item => item.kind === 'audioinput')
                  .map(item => (
                    <MenuItem
                      selected={currentDevices.some(device => device.getSettings().deviceId === item.deviceId)}
                      key={item.deviceId}
                      value={item.deviceId}
                      onClick={() => switchDevice(item.deviceId)}
                    >
                      {item.label}
                    </MenuItem>
                  ))}
                {isRecordingType === 'VIDEO' && <Divider />}
                {isRecordingType === 'VIDEO' && <MenuItem disabled>Video</MenuItem>}
                {isRecordingType === 'VIDEO' &&
                  devices
                    .filter(item => item.kind === 'videoinput')
                    .map(item => (
                      <MenuItem
                        selected={currentDevices.some(device => device.getSettings().deviceId === item.deviceId)}
                        key={item.deviceId}
                        value={item.deviceId}
                        onClick={() => switchDevice(item.deviceId)}
                      >
                        {item.label}
                      </MenuItem>
                    ))}
              </Menu>
            </Box>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                flexFlow: 'column'
              }}
            >
              <ButtonGroup disableElevation size="large" variant="contained">
                <Button size="large" onClick={handleStart}>
                  Start recording
                </Button>
                {!mediaBlobUrl && (
                  <Button size="large" onClick={onChangeRecordingType}>
                    Change recording type
                  </Button>
                )}
              </ButtonGroup>
            </Box>
          </>
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
