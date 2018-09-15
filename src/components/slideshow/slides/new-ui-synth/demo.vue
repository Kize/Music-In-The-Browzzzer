<style lang="scss" scoped>
  @import '../../../../assets/styles/slide';

  .synth {
    position: fixed;
    background: #dbdbdb;
    width: 100vw;
    height: 100vh;

    .upper-row, .lower-row {
      height: 50vh;
      display: flex;
    }

  }
</style>

<template>
  <div class="slide">
    <div class="synth">
      <div class="upper-row">
        <osc></osc>
        <mib-visualizer :width="700" :height="320" :analyzer="output.analyzer"></mib-visualizer>
      </div>
      <div class="lower-row">
        <ui-filter></ui-filter>
        <envelope type="adsr"></envelope>
        <envelope></envelope>
        <lfo></lfo>
      </div>

    </div>
  </div>
</template>

<script>
  import { Keyboard } from '@/core/keyboard'
  import { Synth } from './synth'
  import { Output } from '@/core/output'
  import MibVisualizer from './mib-visualizer.vue'
  import { resetSariasSongMapping, setSariasSongMapping } from '../../../../core/utils/gamepad-service'
  import { createMidiTrack } from '@/core/midi/midi-track'
  import { arkanoid } from '../../../../core/midi/midi-events/arkanoid-events'
  import Osc from './oscillator.vue'
  import Envelope from './envelope'
  import UiFilter from './ui-filter'
  import Lfo from './lfo.vue'

  export default {
    components: {
      UiFilter,
      Envelope,
      MibVisualizer,
      Osc,
      Lfo,
    },
    methods: {
      updateWaveForm(value) {
        this.synth.waveForm = value
      },
      updateDetune(value) {
        this.synth.detune = value
      },
      updateOctave(value) {
        this.keyboard.octave = value
      },
    },
    props: {
      options: {
        type: Object,
      },
    },
    created() {
      this.audioContext = new AudioContext()
      this.synth = Synth(this.audioContext)
      this.output = Output(this.audioContext)
      this.synth.connect(this.output)
      this.midiTrack = createMidiTrack(this.audioContext, arkanoid).setSlave(this.synth)
      this.keyboard = Keyboard(Object.assign(this.synth, this.midiTrack))
      this.keyboard.init()

      console.log(this.options)

      setSariasSongMapping(this.synth.noteOn, this.synth.noteOff)
    },
    destroyed() {
      this.audioContext.close()
      .then(() => {
        this.keyboard.destroy()
      })

      resetSariasSongMapping()
    },
  }
</script>
