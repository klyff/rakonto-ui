import { ReactElement, useCallback, useEffect, useRef, useState } from 'react'

export type ReactMediaRecorderRenderProps = {
  error: string
  startRecording: () => void
  stopRecording: () => void
  devices: MediaDeviceInfo[]
  currentDevices: MediaStreamTrack[]
  mediaBlobUrl: null | string
  status: StatusMessages
  previewStream: MediaStream | null
  clearBlobUrl: () => void
  switchDevice: (deviceId: string) => void
}

export type ReactMediaRecorderHookProps = {
  audio?: boolean | MediaTrackConstraints
  video?: boolean | MediaTrackConstraints
  screen?: boolean
  onStop?: (blobUrl: string, blob: Blob) => void
  blobPropertyBag?: BlobPropertyBag
  mediaRecorderOptions?: MediaRecorderOptions | null
  askPermissionOnMount?: boolean
}
export type ReactMediaRecorderProps = ReactMediaRecorderHookProps & {
  render: (props: ReactMediaRecorderRenderProps) => ReactElement
}

export type StatusMessages =
  | 'media_aborted'
  | 'permission_denied'
  | 'no_specified_media_found'
  | 'media_in_use'
  | 'invalid_media_constraints'
  | 'no_constraints'
  | 'recorder_error'
  | 'idle'
  | 'acquiring_media'
  | 'delayed_start'
  | 'recording'
  | 'stopping'
  | 'stopped'
  | 'paused'

export enum RecorderErrors {
  AbortError = 'media_aborted',
  NotAllowedError = 'permission_denied',
  NotFoundError = 'no_specified_media_found',
  NotReadableError = 'media_in_use',
  OverconstrainedError = 'invalid_media_constraints',
  TypeError = 'no_constraints',
  NONE = '',
  NO_RECORDER = 'recorder_error'
}

export function useReactMediaRecorder({
  audio = true,
  video = false,
  onStop = () => null,
  blobPropertyBag,
  screen = false,
  mediaRecorderOptions = null
}: ReactMediaRecorderHookProps): ReactMediaRecorderRenderProps {
  const mediaRecorder = useRef<MediaRecorder | null>(null)
  const mediaChunks = useRef<Blob[]>([])
  const mediaStream = useRef<MediaStream | null>(null)
  const [status, setStatus] = useState<StatusMessages>('idle')
  const [mediaBlobUrl, setMediaBlobUrl] = useState<string | null>(null)
  const [error, setError] = useState<keyof typeof RecorderErrors>('NONE')
  const [devices, setDevices] = useState<MediaDeviceInfo[]>([])
  const [currentDevices, setCurrenttDevices] = useState<MediaStreamTrack[]>([])

  const getDevices = async () => {
    const devices = await navigator.mediaDevices.enumerateDevices()
    setDevices(devices)
  }

  useEffect(() => {
    getDevices()
  }, [])

  const getMediaStream = useCallback(
    async (deviceId?: string) => {
      setStatus('acquiring_media')
      const requiredMedia: MediaStreamConstraints = {
        audio: typeof audio === 'boolean' ? !!audio : audio,
        video: typeof video === 'boolean' ? !!video : video
      }
      try {
        const constraints: MediaStreamConstraints = {
          audio: requiredMedia.audio,
          video: requiredMedia.video
            ? {
                width: { ideal: 1280 },
                height: { ideal: 720 },
                aspectRatio: { ideal: 1.7777777778 }
              }
            : requiredMedia.video
        }
        if (deviceId) {
          const device = devices.find(item => item.deviceId === deviceId)
          if (!device) {
            setError('NotFoundError')
            return
          }
          if (device.kind === 'videoinput') {
            constraints.video = {
              deviceId: {
                exact: deviceId
              }
            }
          } else if (device.kind === 'audioinput') {
            constraints.audio = {
              deviceId: {
                exact: deviceId
              }
            }
          }
        }
        const stream = await window.navigator.mediaDevices.getUserMedia(constraints)
        mediaStream.current = stream
        setCurrenttDevices(stream.getTracks())
        setStatus('idle')
      } catch (error: any) {
        setError(error.name)
        setStatus('idle')
      }
    },
    [audio, video, screen]
  )

  const onRecordingActive = ({ data }: BlobEvent) => {
    mediaChunks.current.push(data)
  }

  const onRecordingStop = () => {
    const [chunk] = mediaChunks.current
    const blobProperty: BlobPropertyBag = Object.assign(
      { type: chunk.type },
      blobPropertyBag || (video ? { type: 'video/mp4' } : { type: 'audio/wav' })
    )
    const blob = new Blob(mediaChunks.current, blobProperty)
    const url = URL.createObjectURL(blob)
    setStatus('stopped')
    setMediaBlobUrl(url)
    onStop(url, blob)
  }

  const init = useCallback(async () => {
    setError('NONE')
    if (!mediaStream.current) {
      await getMediaStream()
    }
    if (mediaStream.current) {
      const isStreamEnded = mediaStream.current.getTracks().some(track => track.readyState === 'ended')
      if (isStreamEnded) {
        await getMediaStream()
      }
    }
  }, [])

  const switchDevice = async (deviceId: string) => {
    await getMediaStream(deviceId)
    await init()
  }

  useEffect(() => {
    if (!window.MediaRecorder) {
      throw new Error('Unsupported Browser')
    }

    if (screen) {
      // @ts-ignore
      if (!window.navigator.mediaDevices.getDisplayMedia) {
        throw new Error("This browser doesn't support screen capturing")
      }
    }

    const checkConstraints = (mediaType: MediaTrackConstraints) => {
      const supportedMediaConstraints = navigator.mediaDevices.getSupportedConstraints()
      const unSupportedConstraints = Object.keys(mediaType).filter(
        constraint => !(supportedMediaConstraints as { [key: string]: any })[constraint]
      )

      if (unSupportedConstraints.length > 0) {
        console.error(
          `The constraints ${unSupportedConstraints.join(
            ','
          )} doesn't support on this browser. Please check your ReactMediaRecorder component.`
        )
      }
    }

    if (typeof audio === 'object') {
      checkConstraints(audio)
    }
    if (typeof video === 'object') {
      checkConstraints(video)
    }

    if (mediaRecorderOptions && mediaRecorderOptions.mimeType) {
      if (!MediaRecorder.isTypeSupported(mediaRecorderOptions.mimeType)) {
        console.error(`The specified MIME type you supplied for MediaRecorder doesn't support this browser`)
      }
    }

    init()

    return () => {
      if (mediaStream.current) {
        const tracks = mediaStream.current.getTracks()
        tracks.forEach(track => track.stop())
      }
    }
  }, [])

  const startRecording = async () => {
    if (mediaStream.current) {
      mediaRecorder.current = new MediaRecorder(mediaStream.current)
      mediaRecorder.current.ondataavailable = onRecordingActive
      mediaRecorder.current.onstop = onRecordingStop
      mediaRecorder.current.onerror = () => {
        setError('NO_RECORDER')
        setStatus('idle')
      }
      mediaRecorder.current.start()
      setStatus('recording')
    }
  }

  const stopRecording = () => {
    if (mediaRecorder.current) {
      if (mediaRecorder.current.state !== 'inactive') {
        setStatus('stopping')
        mediaRecorder.current.stop()
        mediaStream.current && mediaStream.current.getTracks().forEach(track => track.stop())
        mediaChunks.current = []
      }
    }
  }

  return {
    error: RecorderErrors[error],
    startRecording,
    stopRecording,
    currentDevices,
    devices,
    mediaBlobUrl,
    status,
    switchDevice,
    previewStream: mediaStream.current || null,
    clearBlobUrl: () => {
      if (mediaBlobUrl) {
        URL.revokeObjectURL(mediaBlobUrl)
      }
      setMediaBlobUrl(null)
      setStatus('idle')
    }
  }
}

export const ReactMediaRecorder = (props: ReactMediaRecorderProps) => props.render(useReactMediaRecorder(props))
