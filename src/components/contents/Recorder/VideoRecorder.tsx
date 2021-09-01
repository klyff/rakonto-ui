import React, { useEffect, useRef } from 'react'
import 'video.js/dist/video-js.css'
import videojs from 'video.js'
import { iPlayer } from '@root/types'

import 'webrtc-adapter'
import RecordRTC from 'recordrtc'

import '@root/videoJsPlugins/video-recorder/css/videojs.record.css'
import { register } from '@root/videoJsPlugins/video-recorder/videojs.record'

register(videojs)

const options = {
  controls: true,
  bigPlayButton: false,
  width: 1080,
  height: 720,
  fluid: false,
  plugins: {
    record: {
      audio: true,
      video: true,
      maxLength: 10800
    }
  }
}

interface iRecorder {
  onReady: (player: iPlayer) => void
  getDevices?: boolean
}

const VideoRecorder: React.FC<iRecorder> = ({ onReady, getDevices = true }) => {
  const videoRef = useRef(null)
  const videoRecorderRef = useRef<any | null>(null)

  useEffect(() => {
    if (!videoRecorderRef.current) {
      const videoElement = videoRef.current
      if (!videoElement) return
      const videoRecorderInstance = videojs(videoElement, options, () => {
        const versionInfo = `Using video.js: ${videojs.VERSION} with videojs-record: ${videojs.getPluginVersion(
          'record'
        )} and recordrtc: ${RecordRTC.version}`
        videojs.log(versionInfo)
        if (videoRecorderInstance) {
          onReady && onReady(videoRecorderInstance as iPlayer)
        }
      })
      videoRecorderRef.current = videoRecorderInstance
    }
  }, [onReady, options])

  useEffect(() => {
    if (getDevices && videoRecorderRef.current) {
      videoRecorderRef.current.record().getDevice()
    }
    return () => {
      if (videoRecorderRef.current) {
        videoRecorderRef.current.record().destroy()
        videoRecorderRef.current = null
      }
    }
  }, [getDevices])

  return (
    <div data-vjs-player>
      <video id="myVideo" ref={videoRef} className="video-js vjs-default-skin" playsInline></video>
    </div>
  )
}

export default VideoRecorder
