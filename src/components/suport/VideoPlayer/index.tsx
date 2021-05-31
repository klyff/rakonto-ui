import React, { useState } from 'react'
import { Resolutions, VideoDetails } from '@root/types'
import VideoJsWrapper from './VideoJs'

type PlaySource = {
  id: string
  bitrate?: number
  duration?: number
  format?: string
  height?: number
  src: string
  size?: number
  width?: number
  label: Resolutions
  selected: boolean
  type: 'video/mp4'
}

interface iVideoPlayer {
  video?: VideoDetails
  cover?: string
  defaultRes?: Resolutions
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

const VideoPlayer: React.FC<iVideoPlayer> = ({ video, defaultRes = '720p', cover }) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const { thumbnails, alternatives, gifs } = video
  const [sources] = useState<PlaySource[]>(() => {
    const loadedSourcers = Object.keys(alternatives)
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
    return loadedSourcers
  })

  const getThumbnail = (index = 0): string => {
    const thumbnail = thumbnails[Object.keys(thumbnails).sort(sortByRes)[0]]
    if (!thumbnail?.length) return getThumbnail(index + 1)
    if (thumbnail[0].id) {
      return thumbnail[0].url
    }
    return getThumbnail(index + 1)
  }

  const getCover = (): string => {
    if (cover) {
      return cover
    }
    return getThumbnail()
  }

  const getGif = (index = 0): string => {
    const gif = gifs[Object.keys(gifs).sort(sortByRes)[0]]
    if (!gif?.length) return getThumbnail(index + 1)
    if (gif[0].id) {
      return gif[0].url
    }
    return getGif(index + 1)
  }

  return (
    <VideoJsWrapper
      preview={getGif()}
      options={{
        poster: getCover(),
        sources,
        controls: true,
        fluid: true,
        muted: false
      }}
    />
  )
  return <div />
}

export default VideoPlayer
