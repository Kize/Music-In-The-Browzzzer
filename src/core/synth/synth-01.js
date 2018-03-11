import { midiToFrequency } from '../utils'
import { WaveForms } from '@/core/waveforms'

export const Synth01 = (audioContext) => {
  const output = audioContext.createGain()
  const oscs = {}
  let waveForm = WaveForms.TRIANGLE
  output.gain.value = 0.3

  return {
    noteOn(value, time = audioContext.currentTime) {
      if (!oscs[value]) {
        const osc = audioContext.createOscillator()
        osc.type = waveForm
        const frequency = midiToFrequency(440, value)
        osc.frequency.setValueAtTime(frequency, time)
        osc.connect(output)
        osc.start(time)
        oscs[value] = osc
      }
    },
    noteOff(value, time = audioContext.currentTime) {
      if (oscs[value]) {
        oscs[value].stop(time)
        delete oscs[value]
      }
    },
    connect({ input }) {
      output.connect(input)
    },
    get waveForms() {
      return Object.values(WaveForms)
    },
    get waveForm() {
      return waveForm
    },
    set waveForm(value) {
      waveForm = value
    },
  }
}
