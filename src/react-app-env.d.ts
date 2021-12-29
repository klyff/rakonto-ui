/// <reference types="react-scripts" />

declare module 'react-meta-tags' {
  export default class Meta extends React.Component {}
}
declare module 'react-video-recorder' {
  export interface VideoActionsProps {
    isVideoInputSupported: boolean
    isInlineRecordingSupported: boolean
    thereWasAnError: boolean
    isRecording: boolean
    isCameraOn: boolean
    streamIsReady: boolean
    isConnecting: boolean
    isRunningCountdown: boolean
    countdownTime: number
    timeLimit: number
    showReplayControls: boolean
    replayVideoAutoplayAndLoopOff: boolean
    isReplayingVideo: boolean
    useVideoInput: boolean

    onTurnOnCamera?: () => any
    onTurnOffCamera?: () => any
    onOpenVideoInput?: () => any
    onStartRecording?: () => any
    onStopRecording?: () => any
    onPauseRecording?: () => any
    onResumeRecording?: () => any
    onStopReplaying?: () => any
    onConfirm?: () => any
  }

  export interface ReactVideoRecorderProps {
    /** Whether or not to start the camera initially */
    isOnInitially?: boolean
    /** Whether or not to display the video flipped (makes sense for user facing camera) */
    isFlipped?: boolean
    /** Pass this if you want to force a specific mime-type for the video */
    mimeType?: string
    /** How much time to wait until it starts recording (in ms) */
    countdownTime?: number
    /** Use this if you want to set a time limit for the video (in ms) */
    timeLimit?: number
    /** Use this if you want to show play/pause/etc. controls on the replay video */
    showReplayControls?: boolean
    /** Use this to turn off autoplay and looping of the replay video. It is recommended to also showReplayControls in order to play */
    replayVideoAutoplayAndLoopOff?: boolean
    /** Use this if you want to customize the constraints passed to getUserMedia() */
    constraints?: {
      audio: any
      video: any
    }
    chunkSize?: number
    dataAvailableTimeout?: number
    useVideoInput?: boolean

    renderDisconnectedView?: (props: any) => JSX.Element
    renderLoadingView?: (props: any) => JSX.Element
    renderVideoInputView?: (props: any) => JSX.Element
    renderUnsupportedView?: (props: any) => JSX.Element
    renderErrorView?: (props: any) => JSX.Element
    renderActions?: (props: VideoActionsProps) => JSX.Element

    onCameraOn?: () => any
    onTurnOnCamera?: () => any
    onTurnOffCamera?: () => any
    onStartRecording?: () => any
    onStopRecording?: () => any
    onPauseRecording?: () => any
    onRecordingComplete?: (videoBlob: any) => void

    onResumeRecording?: () => any
    onOpenVideoInput?: () => any
    onStopReplaying?: () => any
    onError?: () => any
  }

  const ReactVideoRecorder: (props: ReactVideoRecorderProps) => JSX.Element

  export default ReactVideoRecorder
}
