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
        <VideoJsWrapper key={id} handleEnd={handleEnd} preview={gifUrl} options={options} />
      </Box>
    )
  }

  if (type === 'AUDIO') {
    const { id, gifUrl, url, thumbnailUrl } = media as AudioDetails
    options.sources = [
      {
        src: url as string,
        type: 'audio/mp3'
      }
    ]
    return (
      <Box maxHeight={720} height={720}>
        <AudioJsWrapper key={id} handleEnd={handleEnd} id={media?.id || ''} options={options} />
      </Box>
    )
  }
  return null
}

export default Player
