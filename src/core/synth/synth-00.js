import { frequencyToMidi, midiToFrequency, randomWaveForm } from '@/core/utils'
import { WaveForms } from '@/core/waveforms'

export const Synth00 = (audioContext) => {
  const output = audioContext.createGain()
  const osc = audioContext.createOscillator()

  const setWaveForm = (waveForm, osc) => {
    if (waveForm === WaveForms.RANDOM) {
      osc.setPeriodicWave(randomWaveForm(audioContext))
    } else {
      osc.type = waveForm
    }
    return osc
  }

  let waveForm = WaveForms.TRIANGLE
  let detune = 0

  const notes = []

  osc.connect(output)

  output.gain.value = 0
  setWaveForm(waveForm, osc)

  osc.start(0)

  return {
    noteOn(value, time = audioContext.currentTime) {
      if (notes.indexOf(value) === -1) {
        notes.push(value)
        const frequency = midiToFrequency(440, value)
        osc.detune.setValueAtTime(detune, time)
        osc.frequency.setTargetAtTime(frequency, time, 0.01)
        output.gain.setValueAtTime(1, time)
      }
    },
    noteOff(value, time = audioContext.currentTime) {
      notes.splice(notes.indexOf(value), 1)
      if (notes.length > 0) {
        const frequency = midiToFrequency(440, notes[notes.length - 1])
        osc.frequency.setValueAtTime(frequency, time)
      } else {
        output.gain.setValueAtTime(0, time)
      }
    },
    pitch(multiplier) {
      if (notes.length > 0) {
        const lastMidiValue = Math.round(frequencyToMidi(440, osc.frequency.value))
        notes.splice(notes.indexOf(lastMidiValue), 1)
        /* pitch actual frequency */
        const newFrequencyValue = osc.frequency.value * multiplier
        /* get midi note value back from pitched frequency */
        const newMidiValue = Math.round(frequencyToMidi(440, newFrequencyValue))
        notes.push(newMidiValue)
        /* apply new frequency */
        osc.frequency.value = newFrequencyValue
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
      setWaveForm(waveForm, osc)
    },
    get detune() {
      return detune
    },
    set detune(value) {
      detune = value
      osc.detune.value = detune
    },
  }
}
