import { GamePadHandler } from 'gamepad-handler'
import { GamepadOptions } from './gamepad-options'
import { eightbitdoGamepad } from './gamepad-mapping-8bitdo'

export const gamepadHandler = new GamePadHandler([eightbitdoGamepad], GamepadOptions)

export function setButtonToPlayNote(mappingIndex, noteOn, noteOff) {
  const buttonMapping = eightbitdoGamepad.buttonsMapping.find(btnMapping => btnMapping.mappingIndex === mappingIndex)

  buttonMapping.mode = 'DOUBLE_ACTION'
  buttonMapping.keydownAction = noteOn
  buttonMapping.keyupAction = noteOff
}

export function resetButton(mappingIndex) {
  const buttonMapping = eightbitdoGamepad.buttonsMapping.find(btnMapping => btnMapping.mappingIndex === mappingIndex)

  buttonMapping.mode = 'KEYBOARD_EVENT'
}

const notesMapping = [
  { mappingIndex: 0, midiNote: 86 },
  { mappingIndex: 1, midiNote: 88 },
  { mappingIndex: 2, midiNote: 79 },
  { mappingIndex: 15, midiNote: 79 },
  { mappingIndex: 13, midiNote: 76 },
  { mappingIndex: 14, midiNote: 74 },
  { mappingIndex: 4, midiNote: 77 },
  { mappingIndex: 5, midiNote: 81 },
  { mappingIndex: 6, midiNote: 83 },
  { mappingIndex: 7, midiNote: 84 },
]

export function setSariasSongMapping(noteOn, noteOff) {
  notesMapping.forEach(mapping => {
    const keydown = () => {
      noteOn(mapping.midiNote)
    }
    const keyup = () => {
      noteOff(mapping.midiNote)
    }
    setButtonToPlayNote(mapping.mappingIndex, keydown, keyup)
  })
}

export function resetSariasSongMapping() {
  notesMapping.forEach(mapping => {
    resetButton(mapping.mappingIndex)
  })
}
