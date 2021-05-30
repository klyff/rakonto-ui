import React, { useEffect, useState } from 'react'
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

const VideoPlayer: React.FC<iVideoPlayer> = ({ video, defaultRes = '720p', cover }) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const { thumbnails, alternatives, gifs } = video
  const resolutions: Resolutions[] = [
    Resolutions['1028p'],
    Resolutions['720p'],
    Resolutions['480p'],
    Resolutions['360p']
  ]
  const [currentResolution, setCurrentResolution] = useState<Resolutions>(resolutions[0])
  const [sources] = useState<PlaySource[]>(() => {
    const loadedSourcers = Object.keys(alternatives).reduce<PlaySource[]>((acc, key): PlaySource[] => {
      const res = key as unknown as Resolutions
      console.log(res)
      const alternavite = alternatives[res]
      if (!alternavite?.length) return acc
      acc.push({
        id: alternavite[0].id,
        src: alternavite[0].url.replace('http:/localhost:8080', ''),
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
    return loadedSourcers.sort((a, b) => {
      const aNumber = parseInt(a.label.replace('p', ''))
      const bNumber = parseInt(b.label.replace('p', ''))
      if (aNumber > bNumber) {
        return -1
      }
      if (bNumber > aNumber) {
        return 1
      }
      return 0
    })
  })

  useEffect(() => {
    const allResolutions = Object.keys(alternatives)
    if (allResolutions.findIndex(resolution => (resolution as unknown as Resolutions) === currentResolution)) return
    setCurrentResolution(resolutions[resolutions.findIndex(resolution => resolution === currentResolution) + 1])
  }, [currentResolution])

  const getThumbnail = (index: number): string => {
    const thumbnail = thumbnails[currentResolution]
    if (!thumbnail?.length) return getThumbnail(index + 1)
    if (thumbnail[0].id) {
      return thumbnail[0].url.replace('http:/localhost:8080', '')
    }
    return getThumbnail(index + 1)
  }

  const getCover = (): string => {
    if (cover) {
      return cover
    }
    return getThumbnail(0)
  }

  return (
    <VideoJsWrapper
      options={{
        sources,
        controls: true,
        fluid: true
      }}
    />
  )
  return <div />
}

export default VideoPlayer
