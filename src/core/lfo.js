import { WaveForms } from '@/core/waveforms'

export const LFO = (audioContext) => {
  const gain = audioContext.createGain()

  let parameter

  let osc

  let frequency = 5

  gain.gain.value = 700

  return {
    trigger(time = audioContext.currentTime) {
      osc = audioContext.createOscillator()
      osc.connect(gain).connect(parameter)
      osc.type = WaveForms.SINE
      osc.frequency.setValueAtTime(frequency, time)
      osc.start(time)
    },
    reset(time = audioContext.currentTime) {
      osc.stop(time)
    },
    get parameter() {
      return parameter
    },
    set parameter(audioParam) {
      parameter = audioParam
    },
    set frequency(value) {
      frequency = value
    },
    get frequency() {
      return frequency
    },
    set amplitude(value) {
      gain.gain.value = value
    },
    get amplitude() {
      return gain.gain.value
    },
  }
}
