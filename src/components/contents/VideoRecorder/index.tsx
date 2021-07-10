import React from 'react'
import { useRecordWebcam } from 'react-record-webcam'
import { VideoBox } from './style'
import { useCreateStory } from '@root/hooks/useCreateStory'

const VideoRecorder: React.FC = () => {
  const recordWebcam = useRecordWebcam({
    fileType: 'webm',
    filename: 'video',
    codec: { audio: 'aac', video: 'av1' }
  })
  const { createStory, progress, isUploading } = useCreateStory()

  const saveFile = async () => {
    const blob = (await recordWebcam.getRecording()) as unknown as Blob
    console.log(blob)
    await createStory(new File([blob], 'video.webm'))
  }

  return (
    <VideoBox>
      <p>Camera status: {recordWebcam.status}</p>
      <button onClick={recordWebcam.open}>Open camera</button>
      <button onClick={recordWebcam.start}>Start recording</button>
      <button onClick={recordWebcam.stop}>Stop recording</button>
      <button onClick={recordWebcam.retake}>Retake recording</button>
      <button onClick={recordWebcam.download}>Download recording</button>
      <button onClick={saveFile}>Save file to server</button>
      <video ref={recordWebcam.webcamRef} autoPlay muted />
      <video ref={recordWebcam.previewRef} autoPlay muted loop />
    </VideoBox>
  )
}

export default VideoRecorder
