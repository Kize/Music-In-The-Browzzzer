import * as R from 'ramda'
import { DOM } from 'rx-dom'

/* keeping track of previous attached listeners */
const subscriptions = []
export const Keyboard = ({ noteOn, noteOff, pitch }) => {
  const keyMapping = ['q', 'a', 's', 'z', 'd', 'f', 'e', 'g', 'r', 'h', 't', 'j']
  let octave = 5

  const getShiftedNote = (key, octave) => keyMapping.indexOf(key) + 12 * octave

  return {
    get octave() {
      return octave
    },
    set octave(value) {
      const last = octave
      octave = R.clamp(1, 8, value)
      if (last !== octave) {
        pitch(
          R.ifElse(
            value => value > 0,
            R.identity,
            value => -1 / value
          )((octave - last) * 2)
        )
      }
    },
    init() {
      /* Key down event triggers noteOn if key is mapped and not already pressed */
      subscriptions.push(
        DOM.keydown(document)
          .filter(({key}) => keyMapping.indexOf(key) !== -1)
          .subscribe(({ key }) => {
            noteOn(getShiftedNote(key, octave))
          })
      )
      /* Key up event triggers noteOff if key is mapped */
      subscriptions.push(
        DOM.keyup(document)
          .filter(({key}) => keyMapping.indexOf(key) !== -1)
          .subscribe(({ key }) => {
            noteOff(getShiftedNote(key, octave))
          })
      )
    },
    destroy() {
      subscriptions.forEach(sub => sub.dispose())
    },
  }
}
