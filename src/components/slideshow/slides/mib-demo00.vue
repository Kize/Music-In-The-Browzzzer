<style lang="scss" scoped>

  .slide {
    h1 {
      color: black;
    }

    .synth {
      width: 600px;
      margin: 0 auto;

      .controls {
        width: 100%;
        display: flex;
        justify-content: space-between;

        .control {
          margin-right: 5px;
        }
      }
    }
  }

</style>

<template>
  <div class="slide">
    <h2>Monophonic Synthesis</h2>
    <div class="synth">
      <div class="controls">
        <mib-spin-box class="control octave"
                      label="Octave"
                      width="50px"
                      :init="keyboard.octave"
                      :min="1"
                      :max="8"
                      @change="updateOctave"></mib-spin-box>

        <mib-spin-box class="control"
                      label="Waveform"
                      :values="synth.waveForms"
                      :init="synth.waveForm"
                      @change="updateWaveForm"></mib-spin-box>

        <mib-slider class="control"
                    label="Detune"
                    :init="synth.detune"
                    width="200px"
                    @change="updateDetune"></mib-slider>
      </div>

      <mib-visualizer class="visualizer"
                      :width="600"
                      :height="400"
                      :analyzer="output.analyzer"></mib-visualizer>
    </div>
  </div>
</template>

<script>
  import { Keyboard } from '@/core/keyboard'
  import { Synth00 } from '@/core/synth/synth-00'
  import { Output } from '@/core/output'
  import MibVisualizer from '@/components/synth/mib-visualizer.vue'
  import MibSpinBox from '@/components/synth/mib-spinbox.vue'
  import MibSlider from '@/components/synth/mib-slider.vue'

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
      updateOctave(value) {
        this.keyboard.octave = value
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
      this.synth = Synth00(this.audioContext)
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
