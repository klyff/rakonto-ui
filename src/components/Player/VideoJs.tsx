import React, { useEffect } from 'react'

import '../../lib/videojs/skins/treso/videojs.css'
import './overrides.css'

import videojs, { VideoJsPlayer, VideoJsPlayerOptions } from 'video.js'
import '../../lib/videojs/components/nuevo'
import '../../lib/videojs/components/visualizer'
import { SubtitleType } from '../../lib/types'

interface iVideoJs {
  options: VideoJsPlayerOptions
  nuevoOptions?: {
    logo: string | null
  }
  onReady?: any
  type: 'audio' | 'video'
  handleEnd?: () => void
  subtitles?: SubtitleType[]
}

export const VideoJS: React.FC<iVideoJs> = ({ subtitles, options, handleEnd, onReady, type, nuevoOptions }) => {
  const playerRef = React.useRef<VideoJsPlayer | null>(null)

  useEffect(() => {
    // make sure Video.js player is only initialized once
    if (!playerRef.current) {
      playerRef.current = videojs('player', options, () => {
        onReady && onReady(playerRef.current)
        // @ts-ignore
        handleEnd && playerRef.current.on('ended', handleEnd)
      })

      const captions =
        subtitles?.map(subtitle => ({
          // If develop mode need replace proxy port = subtitle.url.replace('8080', '3000')
          kind: 'captions',
          src: subtitle.url,
          srlang: subtitle.language,
          label: subtitle.language,
          default: '1'
        })) || []

      // @ts-ignore
      playerRef.current.nuevo(nuevoOptions)

      playerRef.current!.on('nuevoReady', () => {
        if (captions.length) {
          // @ts-ignore
          playerRef.current.loadTracks(captions)
        }
      })

      if (type === 'audio') {
        //  @ts-ignore
        playerRef.current.visualizer({ video: true })
      }
    } else {
      // const player = playerRef.current
      // player.options(options)
    }
  }, [options, nuevoOptions])

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
      {type === 'video' && <video id="player" className="video-js" />}
      {type === 'audio' && <audio id="player" className="video-js" />}
    </div>
  )
}

export const VideoJsWrapper: React.FC<{
  subtitles?: SubtitleType[]
  options: VideoJsPlayerOptions
  preview?: string
  handleEnd?: () => void
}> = ({ options, preview, subtitles, handleEnd }) => {
  const _options = {
    ...options
  }

  const nuevoOptions = { logo: null }

  return (
    <VideoJS subtitles={subtitles} handleEnd={handleEnd} options={_options} type="video" nuevoOptions={nuevoOptions} />
  )
}

export const AudioJsWrapper: React.FC<{
  subtitles?: SubtitleType[]
  options: VideoJsPlayerOptions
  id: string
  handleEnd?: () => void
}> = ({ options, subtitles, handleEnd, id }) => {
  const nuevoOptions = {
    logo: options.poster as string
  }
  const _options = {
    ...options,
    poster: '/images/CoverDefault.png'
  }

  return (
    <VideoJS subtitles={subtitles} handleEnd={handleEnd} options={_options} type="audio" nuevoOptions={nuevoOptions} />
  )
}
