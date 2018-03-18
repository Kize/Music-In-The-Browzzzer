export const AccentEnvelope = (parameter) => {
  let attackTime = 0
  let decayTime = 0
  let accentValue = 0
  let peakValue = parameter.value
  let sustainValue = parameter.value
  let isActive = true

  return {
    connect({ getInput }) {
      parameter.connect(getInput())
      return getInput()
    },
    trigger(time) {
      if (isActive) {
        peakValue = sustainValue + accentValue
        parameter.setValueAtTime(sustainValue, time)
        parameter.linearRampToValueAtTime(peakValue, time + attackTime)
        parameter.exponentialRampToValueAtTime(sustainValue, time + attackTime + decayTime)
      }
    },
    reset(time) {
      if (isActive) {
        parameter.setValueAtTime(sustainValue, time)
        parameter.cancelScheduledValues(time)
      }
    },
    get active() {
      return isActive
    },
    set active(value) {
      isActive = value
    },
    set accent(value) {
      accentValue = value
    },
    get accent() {
      return accentValue
    },
    set attack(value) {
      attackTime = value
    },
    get attack() {
      return attackTime
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
  }
}
