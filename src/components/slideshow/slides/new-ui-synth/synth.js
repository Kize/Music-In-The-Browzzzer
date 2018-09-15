import { create4xVoiceManager } from './voice'

export const Synth = (audioContext) => {
  const voiceManager = create4xVoiceManager(audioContext)

  return {
    noteOn(value, time = audioContext.currentTime) {
      voiceManager.noteOn(value, time)
    },
    noteOff(value, time = audioContext.currentTime) {
      voiceManager.noteOff(value, time)
    },
    connect({ input }) {
      voiceManager.connect({ input })
    },
  }
}
