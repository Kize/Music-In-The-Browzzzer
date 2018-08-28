export const btnIndexesToKeysMapping = {
  0: 'a',
  1: 'z',
  2: 't',
  3: 'r',
  4: 'e',
  6: 'q',
  7: 's',
  8: 'd',
  9: 'f',
  13: 'g',
  14: 'h',
}

const intervalTimeKeyboardButtons = 50
const throttleTimeOnStepsActions = 500

export const GamepadHandler = (actions) => {
  if (!actions || !actions.select || !actions.start) {
    throw new Error('no action given :/')
  }

  const buttons = {}
  const throttlePreviousStep = throttle(actions.select, throttleTimeOnStepsActions)
  const throttleNextStep = throttle(actions.start, throttleTimeOnStepsActions)

  function setLoops() {
    window.addEventListener(`gamepadconnected`, () => {
      window.setInterval(() => {
        const gp = navigator.getGamepads()[0]
        gp.buttons.forEach(handleButton)
      }, intervalTimeKeyboardButtons)
    })
  }

  function handleButton(btn, index) {
    if (btn.pressed && index === 10) {
      throttlePreviousStep()
      return
    }

    if (btn.pressed && index === 11) {
      throttleNextStep()
      return
    }

    btn.pressed ? triggerKey(btnIndexesToKeysMapping[index], index) : triggerKeyEnd(btnIndexesToKeysMapping[index], index)
  }

  function triggerKey(key, index) {
    console.log('Start pressing button')
    const e = newEvent('keydown', key)
    document.dispatchEvent(e)
    buttons['btn' + index] = {
      pressed: true,
    }
  }

  function triggerKeyEnd(key, index) {
    if (buttons['btn' + index] && buttons['btn' + index].pressed) {
      console.log('End pressing button')
      const e = newEvent('keyup', key)
      document.dispatchEvent(e)
      delete buttons['btn' + index]
    }
  }

  return {
    setLoops,
  }
}

function newEvent(type, key) {
  const e = new Event(type)
  e.key = key
  e.keyCode = e.key.charCodeAt(0)
  e.which = e.keyCode
  e.altKey = false
  e.ctrlKey = false
  e.shiftKey = false
  e.metaKey = false
  return e
}

function throttle(callback, wait, context = this) {
  let timeout = null
  let callbackArgs = null

  const later = () => {
    callback.apply(context, callbackArgs)
    timeout = null
  }

  return function () {
    if (!timeout) {
      callbackArgs = arguments
      timeout = setTimeout(later, wait)
    }
  }
}
