<style lang="scss" scoped>
  @import '../../../../assets/styles/slide';

</style>

<template>
  <div class="slide">
    <h2>Synthèse additive</h2>
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
                      label ="Waveform 2"
                      :values="synth.waveForms"
                      :init="synth.waveForm1"
                      @change="updateWaveForm1"></mib-spin-box>

        <mib-slider class="control"
                    label ="Detune 1"
                    :init="synth.detune1"
                    width="180px"
                    @change="updateDetune1"></mib-slider>

        <mib-spin-box class="control"
                      label ="Waveform 2"
                      :values="synth.waveForms"
                      :init="synth.waveForm2"
                      @change="updateWaveForm2"></mib-spin-box>

        <mib-slider class="control"
                    label ="Detune 2"
                    :init="synth.detune2"
                    width="180px"
                    @change="updateDetune2"></mib-slider>
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
  import { AdditiveSynth } from '@/core/synth/additive-synth'
  import { Output } from '@/core/output'
  import MibVisualizer from '@/components/synth/mib-visualizer.vue'
  import MibSpinBox from '@/components/synth/mib-spinbox.vue'
  import MibSlider from '@/components/synth/mib-slider.vue'
  import { createMidiTrack } from '@/core/midi/midi-track'
  import { arkanoid } from '../../../../core/midi/midi-events/arkanoid-events'

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
    created() {
      this.audioContext = new AudioContext()
      this.synth = AdditiveSynth(this.audioContext)
      this.output = Output(this.audioContext)
      this.synth.connect(this.output)
      this.midiTrack = createMidiTrack(this.audioContext, arkanoid).setSlave(this.synth)
      this.keyboard = Keyboard(Object.assign(this.synth, this.midiTrack))
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
