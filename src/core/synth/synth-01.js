import { frequencyToMidi, midiToFrequency, randomWaveForm } from '@/core/utils'
import { WaveForms } from '@/core/waveforms'

export const Synth00 = (audioContext) => {
  const output = audioContext.createGain()
  let waveForm = WaveForms.SAWTOOTH
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
        osc.frequency.setTargetAtTime(frequency, time, 0.001)
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
    pitch(multiplier) {
      Object.values(oscs)
        .forEach((osc) => {
          /* retrieve midi note value from actual frequency */
          const lastMidiValue = Math.round(frequencyToMidi(440, osc.frequency.value))
          /* pitch actual frequency */
          const newFrequencyValue = osc.frequency.value * multiplier
          /* get midi note value back from pitched frequency */
          const newMidiValue = Math.round(frequencyToMidi(440, newFrequencyValue))
          /* apply new frequency */
          osc.frequency.value = newFrequencyValue
          /* associate oscillator to its new midi note value */
          delete oscs[lastMidiValue]
          oscs[newMidiValue] = osc
        })
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
