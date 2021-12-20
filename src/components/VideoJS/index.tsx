// @ts-nocheck
import React, { useState, useEffect } from 'react'

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
  const [player, setPlayer] = useState<VideoJsPlayer | null>(null)

  // Dispose the Video.js player when the functional component unmounts
  useEffect(() => {
    setPlayer(
      videojs('player', options, () => {
        console.log('player ready')
        onReady && onReady(player)
        handleEnd && player.on('ended', handleEnd)
      })
    )
  }, [])

  useEffect(() => {
    return () => {
      if (player) {
        player.dispose()
        setPlayer(null)
      }
    }
  }, [])

  useEffect(() => {
    if (player) {
      player.nuevo({
        logo: options.poster
      })
      player.visualizer({ video: true })
    }
  }, [player])

  return (
    <div data-vjs-player>
      <video id={'player'} className="video-js " />
    </div>
  )
}

export default VideoJS
