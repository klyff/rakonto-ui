import React, { useEffect, useRef, useState } from 'react'
import videojs, { VideoJsPlayer, VideoJsPlayerOptions } from 'video.js'
import videojsQualitySelector from '@silvermine/videojs-quality-selector'

import VideoJS from '@root/components/suport/VideoJS'

const VideoJsWrapper: React.FC<{ options: VideoJsPlayerOptions; preview?: string }> = ({ options, preview }) => {
  const _options = {
    ...options,
    controlBar: {
      subtitlesButton: !!options.tracks?.length,
      children: ['playToggle', 'progressControl', 'volumePanel', 'qualitySelector', 'fullscreenToggle']
    }
  }

  return <VideoJS preview={preview} options={_options} type="video" />
}

export default VideoJsWrapper
