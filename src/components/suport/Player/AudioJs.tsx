import React, { useEffect, useRef, useState } from 'react'
import videojs, { VideoJsPlayer, VideoJsPlayerOptions } from 'video.js'
import { Audio } from './style'

import 'video.js/dist/video-js.css'

// const VJSPlugin = videojs.getPlugin('plugin')
//
// class SpectrumPlugin extends VJSPlugin {
//   // eslint-disable-next-line @typescript-eslint/ban-ts-comment
//   // @ts-ignore
//   // eslint-disable-next-line no-useless-constructor
//   constructor(player, options) {
//     super(player, options)
//     this.player.createEl()
//   }
// }
//
// videojs.registerPlugin('spectrumPlugin', SpectrumPlugin)

const AudioJsWrapper: React.FC<{ options: VideoJsPlayerOptions; id: string }> = ({ options, id }) => {
  const [player, setPlayer] = useState<VideoJsPlayer | null>(null)

  const videoNode = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    if (!videoNode?.current) return
    const playerInstance = videojs(videoNode.current, {
      ...options
    })

    setPlayer(playerInstance)
    return () => {
      player && player.dispose()
    }
  }, [videoNode])

  return (
    <Audio>
      <div data-vjs-player>
        <audio id={`audio-${id}`} ref={videoNode} className="video-js" />
      </div>
    </Audio>
  )
}

export default AudioJsWrapper
