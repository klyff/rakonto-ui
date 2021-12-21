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

      playerRef.current = videojs(videoElement, options, () => {
        onReady && onReady(playerRef.current)
        // @ts-ignore
        handleEnd && playerRef.current.on('ended', handleEnd)
      })
      if (type === 'audio') {
        // @ts-ignore
        playerRef.current.nuevo({
          logo: options.poster
        })
        // @ts-ignore
        playerRef.current.visualizer({ video: true })
      }
    } else {
      // const player = playerRef.current
      // player.options(options)
    }
  }, [options])

  // Dispose the Video.js player when the functional component unmounts
  useEffect(() => {
    return () => {
      if (playerRef.current) {
        playerRef.current.pause()
        playerRef.current.dispose()
        playerRef.current = null
      }
    }
  }, [])

  return (
    <div data-vjs-player>
      {type === 'video' && <video ref={videoRef} className="video-js" />}
      {type === 'audio' && <audio ref={videoRef} className="video-js" />}
    </div>
  )
}

export const VideoJsWrapper: React.FC<{ options: VideoJsPlayerOptions; preview?: string; handleEnd?: () => void }> = ({
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

export const AudioJsWrapper: React.FC<{ options: VideoJsPlayerOptions; id: string; handleEnd?: () => void }> = ({
  options,
  handleEnd,
  id
}) => {
  const _options = {
    ...options
    // plugins: {
    //   wavesurfer: {
    //     backend: 'MediaElement',
    //     displayMilliseconds: false,
    //     debug: true,
    //     waveColor: 'grey',
    //     progressColor: 'black',
    //     cursorColor: 'black',
    //     interact: true,
    //     hideScrollbar: true
    //   }
    // }
  }

  return <VideoJS handleEnd={handleEnd} options={_options} type="audio" />
}
