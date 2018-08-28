import { isNil } from 'ramda'
import { Meta, Status } from 'midi-parse'

const eventTypes = Object.assign({}, Meta, Status)

const toTimedEvents = ({ events }) => {
  let delta = 0
  return events.map((event) => {
    const timedEvent = { ...event, ...{ time: event.delta + delta } }
    delta += event.delta
    return timedEvent
  })
}


export const createMidiTrack = (audioContext, { tracks }) => {
  let slave
  const tempo = 100
  const division = 96

  const events = toTimedEvents(tracks[0])

  const noteOn = (time, note) => {
    if (!isNil(slave)) {
      slave.noteOn(note.value, time)
    }
  }

  const noteOff = (time, note) => {
    if (!isNil(slave)) {
      slave.noteOff(note.value, time)
    }
  }

  return {
    start() {
      const startTime = audioContext.currentTime
      events.forEach((event) => {
        let time = startTime + event.time * (60 / (tempo * division))
        switch (event.type) {
          case Status.NOTE_ON:
            return noteOn(time, event.data)
          case Status.NOTE_OFF:
            return noteOff(time, event.data)
        }
      })
    },
    stop(time = 0) {
      // events.forEach((event) => {
      //   noteOff(time, event.data)
      // })
    },
    setSlave(instrument) {
      slave = instrument
      return this
    },
    getSlave() {
      return slave
    },
  }
}
