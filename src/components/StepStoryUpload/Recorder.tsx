import React, { useEffect, useRef, useState } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'
import Typography from '@mui/material/Typography'
import MovieIcon from '@mui/icons-material/Movie'
import HeadphonesIcon from '@mui/icons-material/Headphones'
import { ReactMediaRecorder } from 'react-media-recorder'
import CameraIndoorIcon from '@mui/icons-material/CameraIndoor'

const VideoPreview = ({ stream }: { stream: MediaStream | null }) => {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream
    }
  }, [stream])
  if (!stream) {
    return null
  }
  return <video height={'95%'} ref={videoRef} autoPlay controls />
}

interface iRecorder {
  onSelected: (value: 'AUDIO' | 'VIDEO' | null) => void
  onDrop: (value: File | null) => void
  type?: 'AUDIO' | 'VIDEO' | null
}

const Recorder: React.FC<iRecorder> = ({ onSelected, type, onDrop }) => {
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
              Record video or audio from your devices
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
        <ReactMediaRecorder
          video={type === 'VIDEO'}
          onStop={(blobUrl: string, blob: Blob) => {
            onDrop(
              new File([blob], `Recorded.${type === 'VIDEO' ? 'mp4' : 'wav'}`, {
                type: type === 'VIDEO' ? 'video/mp4' : 'audio/wav'
              })
            )
          }}
          audio
          render={({
            previewStream,
            previewAudioStream,
            status,
            startRecording,
            stopRecording,
            mediaBlobUrl,
            clearBlobUrl
          }) => {
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
                {status === 'recording' ? (
                  <VideoPreview stream={type === 'VIDEO' ? previewStream : previewAudioStream} />
                ) : (
                  mediaBlobUrl && <video height={'95%'} src={mediaBlobUrl} controls autoPlay />
                )}
                <Box sx={{ position: 'absolute' }}>
                  {status === 'idle' && <Button onClick={startRecording}>Start Recording</Button>}
                  {status === 'recording' && <Button onClick={stopRecording}>Stop Recording</Button>}
                  {status === 'stopped' && mediaBlobUrl && (
                    <Button
                      onClick={() => {
                        clearBlobUrl()
                        onDrop(null)
                      }}
                    >
                      Clear
                    </Button>
                  )}
                  {status === 'idle' && !mediaBlobUrl && (
                    <Button
                      onClick={() => {
                        onSelected(null)
                      }}
                    >
                      Switche media type
                    </Button>
                  )}
                </Box>
              </Box>
            )
          }}
        />
      )}
    </>
  )
}

export default Recorder
