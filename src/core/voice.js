import * as R from 'ramda'
import { WaveForms } from '@/core/waveforms'
import { frequencyToMidi, midiToFrequency, randomWaveForm } from '@/core/utils'

export const Voice = (audioContext) => {
  let osc1
  let osc2
  let detune1
  let detune2
  let waveForm1 = WaveForms.TRIANGLE
  let waveForm2 = WaveForms.SAWTOOTH
  const gain1 = audioContext.createGain()
  const gain2 = audioContext.createGain()
  const output = audioContext.createGain()

  gain1.connect(output)
  gain2.connect(output)

  gain1.gain.value = 0.5
  gain2.gain.value = 0.5

  const setWaveForm = (waveForm, osc = audioContext.createOscillator()) => {
    if (waveForm === WaveForms.RANDOM) {
      osc.setPeriodicWave(randomWaveForm(audioContext))
    } else {
      osc.type = waveForm
    }
    return osc
  }

  const getFrequency = midiToFrequency(440)

  const createOsc = (waveForm, detune) => {
    const osc = audioContext.createOscillator()
    osc.detune.value = detune
    return setWaveForm(waveForm, osc)
  }

  return {
    noteOn(value, time = audioContext.currentTime) {
      const frequency = getFrequency(value)
      osc1 = createOsc(waveForm1, detune1)
      osc2 = createOsc(waveForm2, detune2)
      osc1.frequency.value = frequency
      osc2.frequency.value = frequency
      osc1.connect(gain1)
      osc2.connect(gain2)
      osc1.start(time)
      osc2.start(time)
    },
    noteOff(time) {
      osc1.stop(time)
      osc2.stop(time)
    },
    pitch(multiplier) {
      let newMidiValue, lastMidiValue
      [osc1, osc2]
        .filter(R.identity)
        .forEach((osc) => {
          /* retrieve midi note value from actual frequency */
          lastMidiValue = Math.round(frequencyToMidi(440, osc.frequency.value))
          /* pitch actual frequency */
          const newFrequencyValue = osc.frequency.value * multiplier
          /* get midi note value back from pitched frequency */
          newMidiValue = Math.round(frequencyToMidi(440, newFrequencyValue))
          /* apply new frequency */
          osc.frequency.value = newFrequencyValue
        })
      return { lastMidiValue, newMidiValue }
    },
    connect({ input }) {
      output.connect(input)
    },
    get detune1() {
      return detune1
    },
    set detune1(value) {
      detune1 = value
      if (!osc1) {
        return
      }
      osc1.detune.value = detune1
    },
    get detune2() {
      return detune2
    },
    set detune2(value) {
      detune2 = value
      if (!osc2) {
        return
      }
      osc2.detune.value = detune2
    },
    get waveForm1() {
      return waveForm1
    },
    set waveForm1(value) {
      waveForm1 = value
      setWaveForm(waveForm1, osc1)
    },
    get waveForm2() {
      return waveForm2
    },
    set waveForm2(value) {
      waveForm2 = value
      setWaveForm(waveForm2, osc2)
    },
  }
}
