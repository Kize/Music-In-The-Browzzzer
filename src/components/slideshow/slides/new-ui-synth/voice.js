import { Dispatcher, midiToFrequency, WaveForms } from 'wasa'

const getFrequency = midiToFrequency(440)

const SMOOTHING_TIME_CONSTANT = 1E10

export const create4xVoiceManager = (audioContext) => {
  const voices = {}

  const gain1 = audioContext.createGain()
  const gain2 = audioContext.createGain()
  gain1.gain.value = 0.5
  gain2.gain.value = 0.5

  const fmOscillator = audioContext.createOscillator()
  const fmGain = audioContext.createGain()

  fmOscillator.frequency.value = 400
  fmGain.gain.value = 100
  fmOscillator.connect(fmGain)
  fmOscillator.start()

  const output = audioContext.createGain()

  gain1.connect(output)
  gain2.connect(output)

  let fmRatio = 1

  Dispatcher.as('SQUARE_GAIN_CHANGED')
  .subscribe((value) => {
    gain1.gain.value = Number(value.toFixed(1))
  })

  Dispatcher.as('SAW_GAIN_CHANGED')
  .subscribe((value) => {
    gain2.gain.value = Number(value.toFixed(1))
  })

  Dispatcher.as('FM_AMOUNT_CHANGED')
  .subscribe((value) => {
    fmGain.gain.value = Number(value.toFixed(1)) * 300
  })

  Dispatcher.as('FM_RATIO_CHANGED')
  .subscribe((value) => {
    fmRatio = Number(value.toFixed(1)) * 20 + 2
    for (const voice of Object.values(voices)) {
      fmOscillator.frequency.value = voice.squareOscillator.frequency.value * fmRatio
      break
    }
  })

  return {
    connect({ input, connect }) {
      output.connect(input)
      return { connect }
    },
    noteOn(value, time = audioContext.currentTime) {
      if (!voices[value]) {
        const voice = create4xVoice(audioContext)
        voice.squareOscillator.connect(gain1)
        voice.sawOscillator.connect(gain2)

        fmGain.connect(voice.squareOscillator.frequency)
        fmGain.connect(voice.sawOscillator.frequency)
        voices[value] = voice

        voice.noteOn(value, time)
        voice.start(time)
      }
    },
    noteOff(value, time = audioContext.currentTime) {
      if (voices[value]) {
        voices[value].stop(time)
        delete voices[value]
      }
    },
  }
}

const create4xVoice = (audioContext) => {
  const squareOscillator = audioContext.createOscillator()
  const sawOscillator = audioContext.createOscillator()

  squareOscillator.type = WaveForms.TRIANGLE
  sawOscillator.type = WaveForms.SAWTOOTH

  return {
    noteOn(value, time = audioContext.currentTime) {
      const frequency = getFrequency(value)
      squareOscillator.frequency.setTargetAtTime(frequency, time, SMOOTHING_TIME_CONSTANT)
      sawOscillator.frequency.setTargetAtTime(frequency, time, SMOOTHING_TIME_CONSTANT)
    },
    start(time) {
      squareOscillator.start(time)
      sawOscillator.start(time)
    },
    stop(time) {
      squareOscillator.stop(time)
      sawOscillator.stop(time)
    },
    squareOscillator,
    sawOscillator,
  }
}
