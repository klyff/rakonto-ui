import React, { useEffect } from 'react'

import '../../lib/videojs/skins/treso/videojs.css'
import './overrides.css'

import videojs, { VideoJsPlayer, VideoJsPlayerOptions } from 'video.js'
import '../../lib/videojs/components/nuevo'
import '../../lib/videojs/components/visualizer'
import '../../lib/videojs/components/playlist'
import { SubtitleType } from '../../lib/types'
import { ErrorBoundary, FallbackProps } from 'react-error-boundary'

const defaultNuevoOptions = {
  contextText: 'Powered by Rakonto',
  contextUrl: '//app.rakonto.io',
  contextIcon: '/images/logo.svg'
}

interface iVideoJs {
  embedded?: boolean
  options?: VideoJsPlayerOptions
  playlist?: any
  nuevoOptions?: any
  onReady?: any
  type?: 'audio' | 'video' | 'playlist'
  handleEnd?: () => void
  subtitles?: SubtitleType[]
}

export const VideoJS: React.FC<iVideoJs> = ({
  subtitles,
  options,
  handleEnd,
  onReady,
  type,
  nuevoOptions,
  embedded,
  playlist
}) => {
  const playerRef = React.useRef<VideoJsPlayer | null>(null)

  useEffect(() => {
    let localOptions = {
      ...options
    }
    let localNuevoOptions = {
      ...defaultNuevoOptions,
      ...nuevoOptions
    }
    // make sure Video.js player is only initialized once
    if (!playerRef.current) {
      if (embedded) {
        localOptions = {
          ...localOptions,
          fill: true
        }
      }

      playerRef.current = videojs('player', localOptions, () => {
        onReady && onReady(playerRef.current)
        // @ts-ignore
        handleEnd && playerRef.current.on('ended', handleEnd)
      })

      const captions =
        subtitles?.map(subtitle => ({
          // If develop mode need replace proxy port = subtitle.url.replace('8080', '3000')
          kind: 'captions',
          src: subtitle.url,
          srclang: subtitle.language,
          label: subtitle.language,
          default: '1'
        })) || []

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

      if (type === 'playlist') {
        //  @ts-ignore
        playerRef.current.playsinline(true)

        // @ts-ignore
        localNuevoOptions = {
          ...localNuevoOptions,
          playlistUI: true, // set to disable playlist UI completely
          playlistShow: false, // set to hide playlist UI on start
          playlistAutoHide: false, // Disable playlist UI autohide on video play event
          playlistNavigation: true, // set to show playlist navigation arrows
          playlistRepeat: false, // set to repeat playlist playback
          contextText: 'Powered by Rakonto'
        }
      }

      // @ts-ignore
      playerRef.current.nuevo({
        ...localNuevoOptions
      })

      // @ts-ignore
      if (type === 'playlist') playerRef.current.playlist(playlist)
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

  if (type === 'audio') {
    return <audio id="player" className="video-js" crossOrigin="anonymous" />
  }

  return <video id="player" className="video-js" crossOrigin="anonymous" />
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

  const nuevoOptions = {
    logo: null
  }

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

  function ErrorFallback(props: FallbackProps) {
    return (
      <div role="alert">
        <p>Something went wrong:</p>
        <pre>{props.error.message}</pre>
        <button onClick={props.resetErrorBoundary}>Try again</button>
      </div>
    )
  }

  const myErrorHandler = (error: Error, info: { componentStack: string }) => {
    console.error(error)
  }

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback} onError={myErrorHandler}>
      <VideoJS
        subtitles={subtitles}
        handleEnd={handleEnd}
        options={_options}
        type="audio"
        nuevoOptions={nuevoOptions}
      />
    </ErrorBoundary>
  )
}
