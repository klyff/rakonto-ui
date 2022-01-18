import React from 'react'
import Box from '@mui/material/Box'
import { AudioDetails, MediaType, Resolutions, SubtitleType, VideoDetails } from '../../lib/types'
import { VideoJsWrapper, AudioJsWrapper } from './VideoJs'
import { VideoJsPlayerOptions } from 'video.js'

interface iVideoPlayer {
  media?: VideoDetails | AudioDetails
  cover?: string
  defaultRes?: Resolutions
  type?: MediaType
  subtitles?: SubtitleType[]
  autoplay?: boolean
  handleEnd?: () => void
}

const Player: React.FC<iVideoPlayer> = ({ autoplay, handleEnd, subtitles, media, type, cover }) => {
  const options: VideoJsPlayerOptions = {
    poster: cover,
    preload: 'auto',
    controls: true,
    fill: true,
    muted: autoplay,
    autoplay: autoplay,
    notSupportedMessage:
      'Your recording is still processing. Please wait a few moments, then refresh the page and try again.'
  }

  if (type === 'VIDEO') {
    const { id, gifUrl, url } = media as VideoDetails

    options.sources = [
      {
        src: url as string,
        type: 'video/mp4'
      }
    ]
    return (
      <Box maxHeight={720} height={720}>
        <VideoJsWrapper subtitles={subtitles} key={id} handleEnd={handleEnd} preview={gifUrl} options={options} />
      </Box>
    )
  }

  if (type === 'AUDIO') {
    const { id, url } = media as AudioDetails
    options.sources = [
      {
        src: url!,
        type: 'audio/mp3'
      }
    ]
    return (
      <Box maxHeight={720} height={720}>
        <AudioJsWrapper subtitles={subtitles} key={id} handleEnd={handleEnd} id={media?.id || ''} options={options} />
      </Box>
    )
  }
  return null
}

export default Player
