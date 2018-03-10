import * as R from 'ramda'
import { DOM } from 'rx-dom'
/* keeping track of previous attached listeners */
const subscriptions = []

export const Keyboard = ({ noteOn, noteOff }) => {
  const keyMapping = ['q', 'z', 'd', 'r', 'g', 'h', 'u', 'k', 'o', 'm']
  const keyPressed = []
  let octave = 5

  return {
    get octave() {
      return octave
    },
    set octave(value) {
      octave = value <= 8 ? value : 8
    },
    init() {
      /* Key down event triggers noteOn if key is mapped and not already pressed */
      subscriptions.push(
        DOM.keydown(document)
          .filter(
            R.pipe(
              R.prop('key'),
              R.flip(R.contains)(keyPressed),
              R.not
            )
          )
          .filter(
            R.pipe(
              R.prop('key'),
              R.flip(R.contains)(keyMapping)
            )
          )
          .do(({ key }) => keyPressed.push(key))
          .subscribe(
            R.pipe(
              R.prop('key'),
              R.flip(R.indexOf)(keyMapping),
              R.add(12 * octave),
              noteOn
            )
          )
      )
      /* Key up event triggers noteOff if key is mapped */
      subscriptions.push(
        DOM.keyup(document)
          .filter(
            R.pipe(
              R.prop('key'),
              R.flip(R.contains)(keyMapping)
            )
          )
          .do(({ key }) => keyPressed.splice(keyPressed.indexOf(key, 1)))
          .subscribe(
            R.pipe(
              R.prop('key'),
              R.flip(R.indexOf)(keyMapping),
              R.add(12 * octave), noteOff)
          )
      )
    },
    destroy() {
      subscriptions.forEach(sub => sub.dispose())
    },
  }
}
