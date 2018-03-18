import { WaveForms } from '@/core/waveforms'
import { Voice } from '@/core/voice'
import { FilterTypes } from '@/core/filter-types'
import { AccentEnvelope } from '@/core/accent-envelope'
import { ADSREnvelope } from '@/core/adsr-enveloppe'

export const Synth04 = (audioContext) => {
  const voices = {}

  const output = audioContext.createGain()
  const filter = audioContext.createBiquadFilter()
  const voiceGain = audioContext.createGain()

  let waveForm1 = WaveForms.SQUARE
  let waveForm2 = WaveForms.SQUARE
  let detune1 = 12
  let detune2 = 0

  let filterEnvelope = AccentEnvelope(filter.frequency)

  voiceGain.connect(filter).connect(output)

  output.gain.value = 0.3

  filter.type = FilterTypes.LOW_PASS
  filter.frequency.value = 33
  filter.Q.value = 23

  filterEnvelope.accent = 8000
  filterEnvelope.attack = 0
  filterEnvelope.sustain = filter.frequency.value
  filterEnvelope.decay = 0.5

  let voiceAttack = 0
  let voiceSustain = 0.7
  let voiceDecay = 0.2
  let voiceRelease = 0.2
  let voiceEnvelopeActive = true

  return {
    noteOn(value, time = audioContext.currentTime) {
      if (!voices[value]) {
        filterEnvelope.reset(time)
        const voice = Voice(audioContext)
        voice.envelope = ADSREnvelope(voice.output.gain)
        voice.envelope.attack = voiceAttack
        voice.envelope.decay = voiceDecay
        voice.envelope.sustain = voiceSustain
        voice.envelope.release = voiceRelease
        voice.envelope.active = voiceEnvelopeActive
        voices[value] = voice
        voice.waveForm1 = waveForm1
        voice.waveForm2 = waveForm2
        voice.detune1 = detune1
        voice.detune2 = detune2
        voice.connect({ input: voiceGain })
        voice.noteOn(value, time)
        voice.envelope.trigger(time)
        filterEnvelope.trigger(time)
      }
    },
    noteOff(value, time = audioContext.currentTime) {
      if (voices[value]) {
        filterEnvelope.reset(time)
        voices[value].envelope.reset(time)
        const noteOffTime = voiceEnvelopeActive ? time + voiceRelease : time
        voices[value].noteOff(noteOffTime)
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
        .forEach(voice => { voice.detune1 = detune1 })
    },
    get detune2() {
      return detune2
    },
    set detune2(value) {
      detune2 = value
      Object.values(voices)
        .forEach(voice => { voice.detune2 = detune2 })
    },
    get filterTypes() {
      return Object.values(FilterTypes)
    },
    get filter() {
      return filter
    },
    get filterEnvelope() {
      return filterEnvelope
    },
    get voiceEnvelope() {
      return {
        set attack(value) {
          voiceAttack = value
        },
        get attack() {
          return voiceAttack
        },
        set decay(value) {
          voiceDecay = value
        },
        get decay() {
          return voiceDecay
        },
        set sustain(value) {
          voiceSustain = value
        },
        get sustain() {
          return voiceSustain
        },
        set release(value) {
          voiceRelease = value
        },
        get release() {
          return voiceRelease
        },
        set active(value) {
          voiceEnvelopeActive = value
          Object.values(voices)
            .forEach(voice => {
              voice.envelope.active = voiceEnvelopeActive
            })
        },
        get active() {
          return voiceEnvelopeActive
        },
      }
    },
  }
}
