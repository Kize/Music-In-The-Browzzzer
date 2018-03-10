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
      subscriptions.push(
        DOM.keydown(document)
          .filter(
            R.pipe(
              R.prop('key'),
              R.flip(R.contains)(keyPressed),
              R.not
            )
          )
          .do(({ key }) => keyPressed.push(key))
          .subscribe(R.cond([
            [
              R.pipe(R.prop('key'), R.flip(R.contains)(keyMapping)),
              R.pipe(R.prop('key'), R.flip(R.indexOf)(keyMapping), R.add(12 * octave), noteOn),
            ],
          ]))
      )
      subscriptions.push(
        DOM.keyup(document)
          .do(({ key }) => keyPressed.splice(keyPressed.indexOf(key, 1)))
          .subscribe(R.cond([
            [
              R.pipe(R.prop('key'), R.flip(R.contains)(keyMapping)),
              R.pipe(R.prop('key'), R.flip(R.indexOf)(keyMapping), R.add(12 * octave), noteOff),
            ],
          ]))
      )
    },
    destroy() {
      subscriptions.forEach(sub => sub.dispose())
    },
  }
}
