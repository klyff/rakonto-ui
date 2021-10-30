import React, { forwardRef, useEffect } from 'react'
import Box from '@mui/material/Box'
import Theme from './Theme'

import 'video.js/dist/video-js.css'
import '@silvermine/videojs-quality-selector/dist/css/quality-selector.css'

import videojs, { VideoJsPlayer, VideoJsPlayerOptions } from 'video.js'
// @ts-ignore
import videojsQualitySelector from '@silvermine/videojs-quality-selector'
videojsQualitySelector(videojs)

interface iVideoJs {
  options: VideoJsPlayerOptions
  onReady?: any
  type: 'audio' | 'video'
  preview?: string
  handleEnd?: () => void
}

// eslint-disable-next-line react/display-name
const Video = forwardRef<HTMLVideoElement, { preview?: string }>(({ preview, ...props }, ref) => {
  let sx = {}
  if (preview) {
    sx = {
      'div.vjs-poster:hover': {
        backgroundImage: `url(${preview}) !important`
      }
    }
  }
  return (
    <Box sx={sx} component="video" {...props} ref={ref} className="video-js vjs-theme-fantasy vjs-big-play-centered" />
  )
})

export const VideoJS: React.FC<iVideoJs> = ({ options, handleEnd, onReady, type, preview }) => {
  const videoRef = React.useRef(null)
  const playerRef = React.useRef<VideoJsPlayer | null>(null)

  useEffect(() => {
    // make sure Video.js player is only initialized once
    if (!playerRef.current) {
      const videoElement = videoRef.current
      if (!videoElement) return

      const player = (playerRef.current = videojs(videoElement, options, () => {
        onReady && onReady(player)
        if (options.autoplay) {
          const promise = player.play()

          if (promise !== undefined) {
            promise
              .then(function () {
                // Autoplay started!
              })
              .catch(function () {
                // Autoplay was prevented.
              })
          }
        }
        handleEnd && player.on('ended', handleEnd)
      }))
    } else {
      const player = playerRef.current
      player.options(options)
    }
  }, [options])

  // Dispose the Video.js player when the functional component unmounts
  useEffect(() => {
    return () => {
      if (playerRef.current) {
        playerRef.current.dispose()
        playerRef.current = null
      }
    }
  }, [])

  return (
    <Theme>
      <div data-vjs-player>
        {type === 'video' && <Video preview={preview} ref={videoRef} />}
        {type === 'audio' && <audio ref={videoRef} className="video-js vjs-big-play-centered" />}
      </div>
    </Theme>
  )
}

export default VideoJS
