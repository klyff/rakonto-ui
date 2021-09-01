import React, { useState, useRef } from 'react'
import { useParams } from 'react-router-dom'
import VideoRecorder from './VideoRecorder'
import AudioRecorder from './AudioRecorder'
import { iPlayer } from '@root/types'
import { useCreateStory } from '@root/hooks/useCreateStory'
import { Button, Icon } from 'semantic-ui-react'
import { Box } from './style'

const Recorder: React.FC = () => {
  const recorderRef = useRef<iPlayer>(null)
  const { type } = useParams<{ type: 'audio' | 'video' }>()
  const [isRecording, setIsRecording] = useState(false)
  const [finished, setFinished] = useState(false)
  const { createStory, progress, isUploading } = useCreateStory()

  const handleVideoRecorderReady = (player: iPlayer) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    recorderRef.current = player

    // User clicked the record button and started recording
    player.on('startRecord', () => {
      setIsRecording(true)
    })

    player.on('stopRecord', () => {
      setIsRecording(false)
    })

    // User completed recording and stream is available
    player.on('finishRecord', () => {
      console.log('Finished recording: ', player.recordedData)
      if (player.recordedData) {
        setFinished(true)
      }
    })
  }

  const handleSend = async () => {
    if (!recorderRef.current) return
    const data = recorderRef.current.recordedData
    await createStory(data)
  }

  return (
    <Box>
      {type === 'video' && <VideoRecorder onReady={handleVideoRecorderReady} />}
      {type === 'audio' && <AudioRecorder onReady={handleVideoRecorderReady} />}
      {recorderRef && finished && (
        <Button primary size="huge" onClick={handleSend}>
          <Icon name="upload" />
          {'Send'}
        </Button>
      )}
    </Box>
  )
}

export default Recorder
