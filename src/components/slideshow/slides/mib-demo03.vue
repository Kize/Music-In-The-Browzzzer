<style lang="scss" scoped>

  .slide {
    h1 {
      color: black;
    }
    .synth {
      width: 75%;
      margin: 0 auto;

      .controls {
        display: flex;
        justify-content: space-between;
        margin-top: 10px;

        .control {
          margin-right: 5px;
        }
      }
    }
  }

</style>

<template>
  <div class="slide">
    <h2>Substractive Synthesis</h2>
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
                      label="Waveform 1"
                      :values="synth.waveForms"
                      :init="synth.waveForm1"
                      @change="updateWaveForm1"></mib-spin-box>

        <mib-slider class="control"
                    label="Detune 1"
                    :init="synth.detune1"
                    @change="updateDetune1"></mib-slider>

        <mib-spin-box class="control"
                      label="Waveform 2"
                      :values="synth.waveForms"
                      :init="synth.waveForm2"
                      @change="updateWaveForm2"></mib-spin-box>

        <mib-slider class="control"
                    label="Detune 2"
                    :init="synth.detune2"
                    @change="updateDetune2"></mib-slider>
      </div>

      <div class="controls">
        <mib-spin-box label="filter type"
                      class="control"
                      :values="synth.filterTypes"
                      :init="synth.filterType"
                      width="190px"
                      @change="updateFilterType"></mib-spin-box>

        <mib-slider label="Frequency"
                    class="control"
                    :init="synth.frequency"
                    :min="33"
                    :max="22050"
                    width="300px"
                    valueWidth="120px"
                    @change="updateFrequency"></mib-slider>

        <mib-slider label="Peak"
                    class="control"
                    :init="synth.qualityFactor"
                    :min="0"
                    :max="33"
                    @change="updatePeak"></mib-slider>
        <mib-slider class="control"
                    label ="Filter detune"
                    :init="synth.filterDetune"
                    @change="updateFilterDetune"></mib-slider>
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
  import { Output } from '@/core/output'
  import { Synth03 } from '@/core/synth/synth-03'
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
      updateFilterType(value) {
        this.synth.filterType = value
      },
      updateFrequency(value) {
        this.synth.frequency = value
      },
      updatePeak(value) {
        this.synth.qualityFactor = value
      },
      updateFilterDetune(value) {
        this.synth.filterDetune = value
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
      this.synth = Synth03(this.audioContext)
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
