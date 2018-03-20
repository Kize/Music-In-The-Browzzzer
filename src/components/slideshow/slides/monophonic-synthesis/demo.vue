<style lang="scss" scoped>
  @import '../../../../assets/styles/slide';

  .synth {
    margin-top: -100px !important;

    .controls {
      justify-content: flex-start !important;
    }
  }
</style>

<template>
  <div class="slide">
    <h2>Synthèse monophonique</h2>
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
                      :width="1000"
                      :height="400"
                      :analyzer="output.analyzer"></mib-visualizer>
    </div>
  </div>
</template>

<script>
  import { Keyboard } from '@/core/keyboard'
  import { MonophonicSynth } from '@/core/synth/monophonic-synth'
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
    created() {
      this.audioContext = new AudioContext()
      this.synth = MonophonicSynth(this.audioContext)
      this.output = Output(this.audioContext)
      this.synth.connect(this.output)
      this.keyboard = Keyboard(this.synth)
      this.keyboard.init()
    },
    destroyed() {
      this.audioContext.close()
        .then(() => {
          this.keyboard.destroy()
        })
    },
  }
</script>
