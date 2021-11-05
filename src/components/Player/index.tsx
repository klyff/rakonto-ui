import React from 'react'
import Box from '@mui/material/Box'
import { AudioDetails, MediaType, Resolutions, SubtitleType, VideoDetails } from '../../lib/types'
import VideoJsWrapper from './VideoJs'
import AudioJsWrapper from './AudioJs'
import { VideoJsPlayerOptions } from 'video.js'

interface iVideoPlayer {
  media?: VideoDetails | AudioDetails
  cover?: string
  defaultRes?: Resolutions
  type?: MediaType
  subtitles: SubtitleType[]
  autoplay?: boolean
  handleEnd?: () => void
}

type PlaySource = {
  id: string
  bitrate?: number
  duration?: number
  format?: string
  height?: number
  src: string
  size?: number
  width?: number
  label?: Resolutions
  selected: boolean
  type: 'video/mp4' | 'audio/mp3'
}

const sortByRes = (a: any, b: any) => {
  const aNumber = parseInt(a.replace('p', ''))
  const bNumber = parseInt(b.replace('p', ''))
  if (aNumber > bNumber) {
    return -1
  }
  if (bNumber > aNumber) {
    return 1
  }
  return 0
}

const Player: React.FC<iVideoPlayer> = ({
  autoplay,
  handleEnd,
  subtitles,
  media,
  type,
  defaultRes = '720p',
  cover
}) => {
  const options: VideoJsPlayerOptions = {
    poster: cover,
    controls: true,
    fill: true,
    muted: autoplay,
    autoplay: autoplay,
    tracks: subtitles.map(subtitle => ({
      // If develop mode need replace proxy port = subtitle.url.replace('8080', '3000')
      src: subtitle.url,
      srclang: subtitle.language,
      language: subtitle.language,
      label: subtitle.language
    }))
  }

  if (type === 'VIDEO') {
    const { id, gifUrl, url, thumbnailUrl } = media as VideoDetails

    options.sources = [
      {
        src: url as string,
        type: 'video/mp4'
      }
    ]
    return (
      <Box maxHeight={720} height={720}>
        <VideoJsWrapper handleEnd={handleEnd} preview={gifUrl} options={options} />
      </Box>
    )
  }

  if (type === 'AUDIO') {
    const { id, gifUrl, url, thumbnailUrl } = media as AudioDetails

    options.sources = [
      {
        src: url as string,
        type: 'video/mp3'
      }
    ]
    return (
      <Box maxWidth={1280} maxHeight={720} margin={'0 auto'}>
        <AudioJsWrapper handleEnd={handleEnd} id={media?.id || ''} options={options} />
      </Box>
    )
  }
  return null
}

export default Player
