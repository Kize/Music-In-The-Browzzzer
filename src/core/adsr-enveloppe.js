export const ADSREnvelope = (parameter) => {
  let initValue = 0.1
  let peakValue = 0.5
  let attackTime = 0
  let decayTime = 0
  let releaseTime = 0
  let sustainValue = parameter.value
  let isActive = true

  return {
    connect({ getInput }) {
      parameter.connect(getInput())
      return getInput()
    },
    trigger(time) {
      if (isActive) {
        parameter.setValueAtTime(initValue, time)
        parameter.linearRampToValueAtTime(peakValue, time + attackTime)
        parameter.linearRampToValueAtTime(sustainValue, time + attackTime + decayTime)
      }
    },
    disconnect(time) {
      if (isActive) {
        parameter.linearRampToValueAtTime(initValue, time + releaseTime)
      }
    },
    get active() {
      return isActive
    },
    set active(value) {
      isActive = value
    },
    set init(value) {
      initValue = value
    },
    set attack(value) {
      attackTime = value
    },
    get attack() {
      return attackTime
    },
    set peak(value) {
      peakValue = value
    },
    set decay(value) {
      decayTime = value
    },
    get decay() {
      return decayTime
    },
    set sustain(value) {
      sustainValue = value
    },
    get sustain() {
      return sustainValue
    },
    set release(value) {
      releaseTime = value
    },
    get release() {
      return releaseTime
    },
  }
}
