<style lang="scss" scoped>

  .slide {
    h1 {
      color: black;
    }
    .synth {
      width:75%;
      margin: 0 auto;

      .controls {
        display: flex;
        justify-content: space-between;

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
    <h2>Additive Synthesis</h2>
    <div class="synth">
      <div class="controls">
        <mib-spin-box class="control octave"
                      label="Octave"
                      width="50px"
                      :init="keyboard.octave"
                      @change="updateOctave"></mib-spin-box>

        <mib-spin-box class="control"
                      label ="Waveform 2"
                      :values="synth.waveForms"
                      :init="synth.waveForm1"
                      @change="updateWaveForm1"></mib-spin-box>

        <mib-slider class="control"
                    label ="Detune 1"
                    :init="synth.detune1"
                    @change="updateDetune1"></mib-slider>

        <mib-spin-box class="control"
                      label ="Waveform 2"
                      :values="synth.waveForms"
                      :init="synth.waveForm2"
                      @change="updateWaveForm2"></mib-spin-box>

        <mib-slider class="control"
                    label ="Detune 2"
                    :init="synth.detune2"
                    @change="updateDetune2"></mib-slider>
      </div>

      <mib-visualizer class="visualizer"
                      :width="width"
                      :height="height * 0.75"
                      :analyzer="output.analyzer"></mib-visualizer>
    </div>
  </div>
</template>

<script>
  import { Keyboard } from '@/core/keyboard'
  import { Synth02 } from '@/core/synth/synth-02'
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
      updateWaveForm1(value) {
        this.synth.waveForm1 = value
      },
      updateDetune1(value) {
        this.synth.detune1 = value
      },
      updateWaveForm2(value) {
        this.synth.waveForm2 = value
      },
      updateDetune2(value) {
        this.synth.detune2 = value
      },
      updateOctave(value) {
        this.keyboard.octave = value
      },
    },
    computed: {
      width() {
        return innerWidth * 0.75
      },
      height() {
        return innerHeight * 0.8
      },
    },
    created() {
      this.audioContext = new AudioContext()
      this.synth = Synth02(this.audioContext)
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
