import { midiToFrequency } from '../utils'

export const Synth01 = (audioContext) => {
  const output = audioContext.createGain()
  const oscs = {}

  return {
    noteOn(value, time = audioContext.currentTime) {
      if (!oscs[value]) {
        const osc = audioContext.createOscillator()
        osc.type = 'triangle'
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
  }
}
