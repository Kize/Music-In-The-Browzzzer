export const Output = (audioContext) => {
  const analyzer = audioContext.createAnalyser()
  analyzer.fftSize = 2048
  analyzer.connect(audioContext.destination)

  return {
    get analyzer() {
      return analyzer
    },
    get input() {
      return audioContext.destination
    },
  }
}
