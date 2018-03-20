import Rx from 'rxjs'

export const Reverb = (audioContext) => {
  const convolver = audioContext.createConvolver()
  const merger = audioContext.createChannelMerger(2)
  const splitter = audioContext.createChannelSplitter(2)
  const wetGain = audioContext.createGain()
  const dryGain = audioContext.createGain()
  splitter.connect(wetGain)
  splitter.connect(dryGain)
  wetGain.connect(convolver)
  convolver.connect(merger)
  dryGain.connect(merger)
  wetGain.gain.value = 0.075
  return {
    connect({ input }) {
      merger.connect(input)
    },
    setImpulse(url) {
      return Rx.Observable.create(observer => {
        const xhr = new XMLHttpRequest()
        xhr.open('GET', url, true)
        xhr.responseType = 'arraybuffer'
        xhr.onload = () => {
          audioContext.decodeAudioData(xhr.response, (buffer) => {
            convolver.buffer = buffer
            convolver.loop = true
            convolver.normalize = true
            observer.next(convolver)
            observer.complete()
          })
        }
        xhr.onError = (event) => {
          observer.error(event)
        }
        xhr.send()
      })
    },
    input: splitter,
  }
}
