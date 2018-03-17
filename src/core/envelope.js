export const Envelope = (parameter) => {
  let attackTime = 0
  let decayTime = 0
  let releaseTime = 0
  let accentValue = 0
  let peakValue = parameter.value
  let sustainValue = parameter.value

  return {
    connect({ getInput }) {
      parameter.connect(getInput())
      return getInput()
    },
    noteOn(time) {
      peakValue = sustainValue + accentValue
      parameter.exponentialRampToValueAtTime(peakValue, time + attackTime)
      setTimeout(() => {
        parameter.linearRampToValueAtTime(sustainValue, time + attackTime + decayTime)
      }, attackTime)
    },
    noteOff(value, time) {
      parameter.linearRampToValueAtTime(value, time + releaseTime)
    },
    set accent(value) {
      accentValue = value
    },
    set attack(value) {
      attackTime = value
    },
    set decay(value) {
      decayTime = value
    },
    set sustain(value) {
      sustainValue = value
    },
    set release(value) {
      releaseTime = value
    },
    get release() {
      return releaseTime
    },
  }
}
