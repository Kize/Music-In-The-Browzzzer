import { WaveForms } from '@/core/waveforms'
import { Voice } from '@/core/voice'

export const AdditiveSynth = (audioContext) => {
  const output = audioContext.createGain()
  const voices = {}
  let waveForm1 = WaveForms.SINE
  let waveForm2 = WaveForms.SQUARE
  let detune1 = 0
  let detune2 = 0

  output.gain.value = 0.3

  return {
    noteOn(value, time = audioContext.currentTime) {
      if (!voices[value]) {
        const voice = Voice(audioContext)
        voices[value] = voice
        voice.waveForm1 = waveForm1
        voice.waveForm2 = waveForm2
        voice.detune1 = detune1
        voice.detune2 = detune2
        voice.connect({ input: output })
        voice.noteOn(value, time)
      }
    },
    noteOff(value, time = audioContext.currentTime) {
      if (voices[value]) {
        voices[value].noteOff(time)
        delete voices[value]
      }
    },
    pitch(multiplier) {
      Object.values(voices)
        .forEach((voice) => {
          const midValueChange = voice.pitch(multiplier)
          delete voices[midValueChange.lastMidiValue]
          voices[midValueChange.newMidiValue] = voice
        })
    },
    connect({ input }) {
      output.connect(input)
    },
    get waveForms() {
      return Object.values(WaveForms)
    },
    get waveForm1() {
      return waveForm1
    },
    set waveForm1(value) {
      waveForm1 = value
      Object.values(voices)
        .forEach(voice => { voice.waveForm1 = waveForm1 })
    },
    get waveForm2() {
      return waveForm2
    },
    set waveForm2(value) {
      waveForm2 = value
      Object.values(voices)
        .forEach(voice => { voice.waveForm2 = waveForm2 })
    },
    get detune1() {
      return detune1
    },
    set detune1(value) {
      detune1 = value
      Object.values(voices)
        .forEach(voice => {
          voice.osc1.detune.value = detune1
        })
    },
    get detune2() {
      return detune2
    },
    set detune2(value) {
      detune2 = value
      Object.values(voices)
        .forEach(voice => {
          voice.osc2.detune.value = detune2
        })
    },
  }
}
