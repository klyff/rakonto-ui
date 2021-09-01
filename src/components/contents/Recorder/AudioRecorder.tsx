import React, { useEffect, useRef } from 'react'
import 'video.js/dist/video-js.css'
import videojs from 'video.js'
import { iPlayer } from '@root/types'

import 'webrtc-adapter'
import RecordRTC from 'recordrtc'

import WaveSurfer from 'wavesurfer.js'
import MicrophonePlugin from 'wavesurfer.js/dist/plugin/wavesurfer.microphone.js'

import '@root/videoJsPlugins/videojs-wavesurfer/css/videojs.wavesurfer.css'
import { register as registeWavesufer } from '@root/videoJsPlugins/videojs-wavesurfer/videojs.wavesurfer.js'

import '@root/videoJsPlugins/video-recorder/css/videojs.record.css'
import { register } from '@root/videoJsPlugins/video-recorder/videojs.record'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
WaveSurfer.microphone = MicrophonePlugin
registeWavesufer(videojs)
register(videojs)

const options = {
  controls: true,
  bigPlayButton: false,
  width: 1080,
  height: 720,
  fluid: false,
  plugins: {
    wavesurfer: {
      backend: 'WebAudio',
      waveColor: '#36393b',
      progressColor: 'black',
      debug: true,
      cursorWidth: 1,
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
      maxLength: 10800
    }
  }
}

interface iRecorder {
  onReady: (player: iPlayer) => void
  getDevices?: boolean
}

const VideoRecorder: React.FC<iRecorder> = ({ onReady, getDevices = true }) => {
  const audioRef = useRef(null)
  const audioRecorderRef = useRef<any | null>(null)

  useEffect(() => {
    if (!audioRecorderRef.current) {
      const videoElement = audioRef.current
      if (!videoElement) return
      const videoRecorderInstance = videojs(videoElement, options, () => {
        console.log('video')
        const versionInfo = `Using video.js: ${videojs.VERSION}
          with videojs-record: ${videojs.getPluginVersion('record')}
          ,videojs-wavesurfer: ${videojs.getPluginVersion('wavesurfer')}
          and recordrtc: ${RecordRTC.version}`
        videojs.log(versionInfo)
        if (videoRecorderInstance) {
          onReady && onReady(videoRecorderInstance as iPlayer)
        }
      })
      audioRecorderRef.current = videoRecorderInstance
    }
  }, [onReady, options])

  return <audio id="myAudio" ref={audioRef} className="video-js vjs-default-skin"></audio>
}

export default VideoRecorder
