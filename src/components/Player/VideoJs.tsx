import React from 'react'
import { VideoJsPlayerOptions } from 'video.js'

import VideoJS from '../VideoJS'

const VideoJsWrapper: React.FC<{ options: VideoJsPlayerOptions; preview?: string; handleEnd?: () => void }> = ({
  options,
  preview,
  handleEnd
}) => {
  const _options = {
    ...options,
    controlBar: {
      subtitlesButton: !!options.tracks?.length,
      children: ['playToggle', 'progressControl', 'volumePanel', 'qualitySelector', 'fullscreenToggle']
    }
  }

  return <VideoJS handleEnd={handleEnd} preview={preview} options={_options} type="video" />
}

export default VideoJsWrapper
