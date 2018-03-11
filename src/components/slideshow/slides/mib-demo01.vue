<style lang="scss" scoped>

  .slide {
    h1 {
      color: black;
    }
    .synth {
      width: 50%;
      margin: 0 auto;
      .controls {
        display: flex;
        .control {
          margin-right: 5px;
        }
      }
      .visualizer {

      }
    }
  }

</style>

<template>
  <div class="slide">
    <h2>One Osc Synthesizer</h2>
    <div class="synth">
      <div class="controls">
        <mib-spin-box class="control"
          :values="synth.waveForms"
          :init="synth.waveForm"
          @change="updateWaveForm"></mib-spin-box>

        <mib-slider class="control"
          :init="synth.detune"
          @change="updateDetune"></mib-slider>
      </div>

      <mib-visualizer class="visualizer"
                      :width="width"
                      :height="height * 0.75"
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
  import MibSlider from '../../synth/mib-slider.vue'

  export default {
    components: {
      MibVisualizer,
      MibSpinBox,
      MibSlider,
    },
    methods: {
      updateWaveForm(value) {
        this.synth.waveForm = value
      },
      updateDetune(value) {
        this.synth.detune = value
      },
    },
    computed: {
      width() {
        return innerWidth * 0.5
      },
      height() {
        return innerHeight * 0.8
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
