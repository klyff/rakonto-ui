import React from 'react'
import { AudioDetails, MediaType, Resolutions, VideoDetails } from '@root/types'
import VideoJsWrapper from './VideoJs'
import AudioJsWrapper from './AudioJs'
import { VideoJsPlayerOptions } from 'video.js'

interface iVideoPlayer {
  media?: VideoDetails | AudioDetails
  cover?: string
  defaultRes?: Resolutions
  type?: MediaType
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

const Player: React.FC<iVideoPlayer> = ({ media, type, defaultRes = '720p', cover }) => {
  const options: VideoJsPlayerOptions = {
    poster: cover,
    controls: true,
    fluid: true,
    muted: false
  }

  if (type === 'VIDEO') {
    const alternatives = (media as VideoDetails).alternatives
    const gifs = (media as VideoDetails).gifs

    const getGif = (index = 0): string => {
      const gif = gifs[Object.keys(gifs).sort(sortByRes)[0] as Resolutions]
      if (!gif?.length) return cover || ''
      if (gif[0].id) {
        return gif[0].url
      }
      return getGif(index + 1)
    }

    options.sources = Object.keys(alternatives)
      .sort(sortByRes)
      .reduce<PlaySource[]>((acc, key): PlaySource[] => {
        const res = key as unknown as Resolutions
        const alternavite = alternatives[res]
        if (!alternavite?.length) return acc
        acc.push({
          id: alternavite[0].id,
          src: alternavite[0].url,
          bitrate: alternavite[0].info.bitRate as number,
          duration: alternavite[0].info.duration as number,
          height: alternavite[0].info.height as number,
          width: alternavite[0].info.width as number,
          label: res,
          selected: res === defaultRes,
          type: 'video/mp4'
        })
        return acc
      }, [] as PlaySource[])
    return <VideoJsWrapper preview={getGif()} options={options} />
  }

  if (type === 'AUDIO') {
    const alternatives = (media as AudioDetails).alternatives
    options.sources = alternatives.reduce<PlaySource[]>((acc, value, index): PlaySource[] => {
      acc.push({
        id: value.id,
        src: value.url,
        selected: index === 0,
        type: 'audio/mp3'
      })
      return acc
    }, [] as PlaySource[])
    return <AudioJsWrapper id={media?.id || ''} options={options} />
  }
  return null
}

export default Player
