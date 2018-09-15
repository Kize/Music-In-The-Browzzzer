import * as R from 'ramda'
import { DOM } from 'rx-dom'

export function Keyboard({ start, stop, noteOn, noteOff, pitch }) {
  const subscriptions = []
  const keyMapping = ['q', 'a', 's', 'z', 'd', 'f', 'e', 'g', 'r', 'h', 't', 'j']
  const playKey = ' '

  let octave = 4
  let isStarted = false

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
            value => -1 / value,
          )((octave - last) * 2),
        )
      }
    },
    init() {
      /* Key down event triggers noteOn if key is mapped and not already pressed */
      subscriptions.push(
        DOM.keydown(document)
        .filter(({ key }) => keyMapping.indexOf(key) !== -1)
        .subscribe(({ key }) => {
          noteOn(getShiftedNote(key, octave))
        }),
      )
      /* Key up event triggers noteOff if key is mapped */
      subscriptions.push(
        DOM.keyup(document)
        .filter(({ key }) => keyMapping.indexOf(key) !== -1)
        .subscribe(({ key }) => {
          noteOff(getShiftedNote(key, octave))
        }),
      )
      /* Map space bar to play/stop */
      subscriptions.push(
        DOM.keyup(document)
        .filter(({ key }) => key === playKey)
        .filter(() => start && stop)
        .do(() => isStarted ? stop() : start())
        .subscribe(() => {
          isStarted = !isStarted
        }),
      )
    },
    destroy() {
      subscriptions.forEach(sub => sub.dispose())
    },
  }
}
