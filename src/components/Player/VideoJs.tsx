import React, { useEffect } from 'react'

import '../../lib/videojs/skins/treso/videojs.css'

import videojs, { VideoJsPlayer, VideoJsPlayerOptions } from 'video.js'
import '../../lib/videojs/components/nuevo'
import '../../lib/videojs/components/visualizer'

interface iVideoJs {
  options: VideoJsPlayerOptions
  onReady?: any
  type: 'audio' | 'video'
  handleEnd?: () => void
}

export const VideoJS: React.FC<iVideoJs> = ({ options, handleEnd, onReady, type }) => {
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
      // @ts-ignore
      player.nuevo({
        logo: options.poster
      })
      // @ts-ignore
      player.visualizer({ video: true })
    } else {
      // const player = playerRef.current
      // player.options(options)
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
    <div data-vjs-player>
      <video id={'player'} className="video-js " />
    </div>
  )
}

const VideoJsWrapper: React.FC<{ options: VideoJsPlayerOptions; preview?: string; handleEnd?: () => void }> = ({
  options,
  preview,
  handleEnd
}) => {
  const _options = {
    ...options,
    controlBar: {
      subtitlesButton: !!options.tracks?.length,
      children: ['playToggle', 'progressControl', 'volumePanel', 'qualitySelector', 'fullscreenToggle']
    }
  }

  return <VideoJS handleEnd={handleEnd} options={_options} type="video" />
}

export default VideoJsWrapper
