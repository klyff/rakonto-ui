/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useEffect, useRef } from 'react'
import { iPlayer } from '@root/types'

import 'video.js/dist/video-js.css'
import '@root/videoJsPlugins/videojs-wavesurfer/css/videojs.wavesurfer.css'
import '@root/videoJsPlugins/video-recorder/css/videojs.record.css'

import videojs from 'video.js'
import WaveSurfer from 'wavesurfer.js'

import 'webrtc-adapter'
import RecordRTC from 'recordrtc'
import MicrophonePlugin from 'wavesurfer.js/dist/plugin/wavesurfer.microphone.js'
import { register as registerWavesufer } from '@root/videoJsPlugins/videojs-wavesurfer/videojs.wavesurfer'
import { register } from '@root/videoJsPlugins/video-recorder/videojs.record'

// @ts-ignore
WaveSurfer.microphone = MicrophonePlugin
registerWavesufer(videojs)
register(videojs)

const options = {
  controls: true,
  bigPlayButton: false,
  fluid: true,
  aspectRatio: '16:9',
  plugins: {
    wavesurfer: {
      backend: 'WebAudio',
      waveColor: '#36393b',
      progressColor: 'black',
      cursorWidth: 1.5,
      msDisplayMax: 20,
      hideScrollbar: true,
      displayMilliseconds: true,
      plugins: [
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        WaveSurfer.microphone.create({
          bufferSize: 4096,
          numberOfInputChannels: 1,
          numberOfOutputChannels: 1,
          constraints: {
            video: false,
            audio: true
          }
        })
      ]
    },
    record: {
      audio: true,
      video: false,
      maxLength: 10800,
      audioMimeType: 'audio/webm'
    }
  }
}

interface iRecorder {
  onReady: (player: iPlayer) => void
  getDevices?: boolean
}

const AudioRecorder: React.FC<iRecorder> = ({ onReady, getDevices = true }) => {
  const audioRef = useRef(null)
  const playerRef = useRef<any | null>(null)

  useEffect(() => {
    if (!playerRef.current) {
      const videoElement = audioRef.current
      if (!videoElement) return
      const videoRecorderInstance = videojs(videoElement, options, () => {
        const versionInfo = `Using video.js: ${videojs.VERSION}
          with videojs-record: ${videojs.getPluginVersion('record')}
          ,videojs-wavesurfer: ${videojs.getPluginVersion('wavesurfer')}
          and recordrtc: ${RecordRTC.version}`
        videojs.log(versionInfo)
        if (videoRecorderInstance) {
          onReady && onReady(videoRecorderInstance as iPlayer)
        }
      })
      playerRef.current = videoRecorderInstance
    }
  }, [onReady, options])

  useEffect(() => {
    if (!playerRef.current) return
    return () => {
      if (!playerRef.current) return
      playerRef.current.dispose()
      playerRef.current = null
    }
  }, [])

  return <audio id="myAudio" ref={audioRef} className="video-js vjs-default-skin"></audio>
}

export default AudioRecorder
