import React from 'react'
import { Audio } from './style'
import { VideoJsPlayerOptions } from 'video.js'
import VideoJS from '../VideoJS'

const AudioJsWrapper: React.FC<{ options: VideoJsPlayerOptions; id: string }> = ({ options, id }) => {
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

  return (
    <Audio>
      <VideoJS options={_options} type="audio" />
    </Audio>
  )
}

export default AudioJsWrapper
