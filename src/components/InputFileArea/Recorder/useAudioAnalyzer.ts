export default (stream: MediaStream | null) => {
  if (stream) {
    // @ts-ignore
    const AudioContext = window.AudioContext || window.webkitAudioContext
    const audioContext = new AudioContext()
    const audioSrc = audioContext.createMediaStreamSource(stream)
    const analyser = audioContext.createAnalyser()
    audioSrc.connect(analyser)
    return analyser
  }
  return null
}
