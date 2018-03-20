import { WaveForms } from '@/core/waveforms'
import { frequencyToMidi, midiToFrequency, randomWaveForm } from '@/core/utils'

export const Voice = (audioContext) => {
  const setWaveForm = (waveForm, osc) => {
    if (waveForm === WaveForms.RANDOM) {
      osc.setPeriodicWave(randomWaveForm(audioContext))
    } else {
      osc.type = waveForm
    }
  }

  const osc1 = audioContext.createOscillator()
  const osc2 = audioContext.createOscillator()
  const allOscsFrequencySource = audioContext.createConstantSource()

  let waveForm1 = WaveForms.TRIANGLE
  let waveForm2 = WaveForms.SAWTOOTH
  setWaveForm(waveForm1, osc1)
  setWaveForm(waveForm2, osc2)
  const gain1 = audioContext.createGain()
  const gain2 = audioContext.createGain()
  const output = audioContext.createGain()

  gain1.connect(output)
  gain2.connect(output)

  allOscsFrequencySource.connect(osc1.frequency)
  allOscsFrequencySource.connect(osc2.frequency)

  gain1.gain.value = 0.5
  gain2.gain.value = 0.5

  allOscsFrequencySource.offset.value = 0
  allOscsFrequencySource.start(audioContext.currentTime)

  const getFrequency = midiToFrequency(440)

  return {
    noteOn(value, time = audioContext.currentTime) {
      const frequency = getFrequency(value)
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
    get osc1() {
      return osc1
    },
    get osc2() {
      return osc2
    },
    get allOscsFrequencySource() {
      return allOscsFrequencySource
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
    get output() {
      return output
    },
  }
}
