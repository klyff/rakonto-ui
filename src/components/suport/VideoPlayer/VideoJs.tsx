import React, { useEffect, useRef, useState } from 'react'
import videojs, { VideoJsPlayer, VideoJsPlayerOptions } from 'video.js'
import videojsQualitySelector from '@silvermine/videojs-quality-selector'

import 'video.js/dist/video-js.css'
import '@silvermine/videojs-quality-selector/dist/css/quality-selector.css'

videojsQualitySelector(videojs)

const VideoJsWrapper: React.FC<{ options: VideoJsPlayerOptions }> = ({ options }) => {
  const [player, setPlayer] = useState<VideoJsPlayer | null>(null)
  const videoNode = useRef(null)

  useEffect(() => {
    const playerInstance = videojs(
      videoNode.current,
      {
        ...options,
        controlBar: {
          children: ['playToggle', 'progressControl', 'volumePanel', 'qualitySelector', 'fullscreenToggle']
        }
      },
      function onPlayerReady() {
        console.log('onPlayerReady', player)
      }
    )
    setPlayer(playerInstance)
    return () => {
      player && player.dispose()
    }
  }, [videoNode, player])

  return <video ref={videoNode} className="video-js" width="100%"></video>
}

export default VideoJsWrapper
