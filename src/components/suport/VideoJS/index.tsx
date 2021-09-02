/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from 'react'

import { Video } from './style'
import 'video.js/dist/video-js.css'
import '@silvermine/videojs-quality-selector/dist/css/quality-selector.css'

import videojs, { VideoJsPlayer, VideoJsPlayerOptions } from 'video.js'
import videojsQualitySelector from '@silvermine/videojs-quality-selector'
videojsQualitySelector(videojs)

interface iVideoJs {
  options: VideoJsPlayerOptions
  onReady?: any
  type: 'audio' | 'video'
  preview?: string
}

export const VideoJS: React.FC<iVideoJs> = ({ options, onReady, type, preview }) => {
  const videoRef = React.useRef(null)
  const playerRef = React.useRef<VideoJsPlayer | null>(null)

  React.useEffect(() => {
    // make sure Video.js player is only initialized once
    if (!playerRef.current) {
      const videoElement = videoRef.current
      if (!videoElement) return

      const player = (playerRef.current = videojs(videoElement, options, () => {
        console.log('player is ready')
        onReady && onReady(player)
      }))
    } else {
      // you can update player here [update player through props]
      // const player = playerRef.current;
      // player.autoplay(options.autoplay);
      // player.src(options.sources);
    }
  }, [options])

  // Dispose the Video.js player when the functional component unmounts
  React.useEffect(() => {
    return () => {
      if (playerRef.current) {
        playerRef.current.dispose()
        playerRef.current = null
      }
    }
  }, [])

  return (
    <div data-vjs-player>
      {type === 'video' && <Video preview={preview} ref={videoRef} className="video-js vjs-big-play-centered" />}
      {type === 'audio' && <audio ref={videoRef} className="video-js vjs-big-play-centered" />}
    </div>
  )
}

export default VideoJS
