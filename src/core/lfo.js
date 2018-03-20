import { WaveForms } from '@/core/waveforms'
import { LFODestinations } from '@/core/lfo-destinations'
import { randomWaveForm } from '@/core/utils'

export const LFO = (audioContext) => {
  const osc = audioContext.createOscillator()
  const gain = audioContext.createGain()

  const setWaveForm = (waveForm, osc) => {
    if (waveForm === WaveForms.RANDOM) {
      osc.setPeriodicWave(randomWaveForm(audioContext))
    } else {
      osc.type = waveForm
    }
  }

  let parameter
  let destination = LFODestinations.OFF
  let waveForm = WaveForms.SINE

  gain.gain.value = 700

  osc.connect(gain)
  osc.frequency.value = 5
  setWaveForm(waveForm, osc)
  osc.start(audioContext.currentTime)

  return {
    set parameter(audioParam) {
      parameter = audioParam
      if (destination !== LFODestinations.OFF) {
        gain.disconnect()
        gain.connect(parameter)
      }
    },
    set frequency(value) {
      osc.frequency.value = value
    },
    get frequency() {
      return osc.frequency.value
    },
    set amplitude(value) {
      gain.gain.value = value
    },
    get amplitude() {
      return gain.gain.value
    },
    set destination(value) {
      destination = value
      if (destination === LFODestinations.OFF) {
        gain.disconnect()
      } else {
        gain.connect(parameter)
      }
    },
    get destination() {
      return destination
    },
    set waveForm(value) {
      waveForm = value
      setWaveForm(waveForm, osc)
    },
    get waveForm() {
      return waveForm
    },
  }
}
