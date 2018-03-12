import { midiToFrequency, randomWaveForm } from '@/core/utils'
import { WaveForms } from '@/core/waveforms'

export const Synth01 = (audioContext) => {
  const output = audioContext.createGain()
  let waveForm = WaveForms.TRIANGLE
  let detune = 0
  const oscs = {}

  const setWaveForm = (osc) => {
    if (waveForm === WaveForms.RANDOM) {
      osc.setPeriodicWave(randomWaveForm(audioContext))
    } else {
      osc.type = waveForm
    }
    return osc
  }

  output.gain.value = 0.3

  return {
    noteOn(value, time = audioContext.currentTime) {
      if (!oscs[value]) {
        const osc = audioContext.createOscillator()
        const frequency = midiToFrequency(440, value)
        setWaveForm(osc)
        osc.detune.setValueAtTime(detune, time)
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
      Object.values(oscs)
        .forEach(setWaveForm)
    },
    get detune() {
      return detune
    },
    set detune(value) {
      detune = value
      Object.values(oscs)
        .forEach(osc => { osc.detune.value = detune })
    },
  }
}
