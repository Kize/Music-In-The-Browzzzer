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
                    width="180px"
                    :init="synth.detune1"
                    @change="updateDetune1"></mib-slider>

        <mib-spin-box class="control"
                      label="Waveform 2"
                      :values="synth.waveForms"
                      :init="synth.waveForm2"
                      @change="updateWaveForm2"></mib-spin-box>

        <mib-slider class="control"
                    label="Detune 2"
                    width="180px"
                    :init="synth.detune2"
                    @change="updateDetune2"></mib-slider>
      </div>

      <div class="controls">
        <mib-spin-box label="filter type"
                      class="control"
                      :values="synth.filterTypes"
                      :init="synth.filter.type"
                      width="190px"
                      @change="updateFilterType"></mib-spin-box>

        <mib-slider label="Frequency"
                    class="control"
                    :init="synth.filter.frequency.value"
                    :min="33"
                    :max="22050"
                    width="280px"
                    valueWidth="120px"
                    @change="updateFilterFrequency"></mib-slider>

        <mib-slider label="Peak"
                    class="control"
                    :init="synth.filter.Q.value"
                    :min="0"
                    :max="29"
                    :step="0.1"
                    width="230px"
                    @change="updateFilterPeak"></mib-slider>
        <mib-slider class="control"
                    label ="Filter detune"
                    :init="synth.filter.detune.value"
                    width="180px"
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
        this.synth.filter.type = value
      },
      updateFilterFrequency(value) {
        this.synth.filter.frequency.value = value
      },
      updateFilterPeak(value) {
        this.synth.filter.Q.value = value
      },
      updateFilterDetune(value) {
        this.synth.filter.detune.value = value
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
      if (!this.audioContext) {
        this.audioContext = new AudioContext()
        this.synth = Synth03(this.audioContext)
        this.output = Output(this.audioContext)
        this.synth.connect(this.output)
        this.keyboard = Keyboard(this.synth)
        this.keyboard.init()
      }
    },
    destroyed() {
      this.keyboard.destroy()
      this.audioContext.close()
        .then(() => {
          delete this.audioContext
        })
    },
  }
</script>
