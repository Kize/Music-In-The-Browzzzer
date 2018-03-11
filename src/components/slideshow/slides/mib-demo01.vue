<style lang="scss" scoped>

  .slide {
    h1 {
      color: black;
    }
  }

</style>

<template>
  <div class="slide">
    <h2>One Osc Synthesizer</h2>
    <div class="synth">

      <div class="controls">
        <mib-spin-box
          :values="synth.waveForms"
          :init="synth.waveForm"
          @change="updateWaveForm"></mib-spin-box>
      </div>

      <mib-visualizer
        :width="600"
        :height="400"
        :analyzer="output.analyzer"></mib-visualizer>
    </div>
  </div>
</template>

<script>
  import { Keyboard } from '../../../core/keyboard'
  import { Synth01 } from '../../../core/synth/synth-01'
  import { Output } from '../../../core/output'
  import MibVisualizer from '../../synth/mib-visualizer.vue'
  import MibSpinBox from '../../synth/mib-spinbox.vue'

  export default {
    components: {
      MibVisualizer,
      MibSpinBox,
    },
    methods: {
      updateWaveForm(value) {
        this.synth.waveForm = value
      },
    },
    created() {
      this.audioContext = new AudioContext()
      this.synth = Synth01(this.audioContext)
      this.output = Output(this.audioContext)
      this.synth.connect(this.output)
      this.keyboard = Keyboard(this.synth)
      this.keyboard.init()
    },
    destroyed() {
      this.keyboard.destroy()
      this.audioContext.close()
    },
  }
</script>
