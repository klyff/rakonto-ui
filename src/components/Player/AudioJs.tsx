import React from 'react'
import { VideoJsPlayerOptions } from 'video.js'
import VideoJS from '../VideoJS'

const AudioJsWrapper: React.FC<{ options: VideoJsPlayerOptions; id: string; handleEnd?: () => void }> = ({
  options,
  handleEnd,
  id
}) => {
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

  return <VideoJS handleEnd={handleEnd} options={_options} type="audio" />
}

export default AudioJsWrapper
