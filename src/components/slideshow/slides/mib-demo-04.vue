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
    <h2>Envelopes</h2>
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
        <mib-toggle label="On/Off"
                    :init="synth.voiceEnvelope.active"
                    @change="toggleVoiceEnvelope"></mib-toggle>

        <mib-slider class="control"
                    label ="Attack"
                    :init="synth.voiceEnvelope.attack"
                    :min="0"
                    :max="1"
                    :step="0.1"
                    width="200px"
                    @change="updateVoiceAttack"></mib-slider>

        <mib-slider class="control"
                    label ="Decay"
                    :init="synth.voiceEnvelope.decay"
                    :min="0"
                    :max="1"
                    :step="0.1"
                    width="200px"
                    @change="updateVoiceDecay"></mib-slider>

        <mib-slider class="control"
                    label ="Sustain"
                    :init="synth.voiceEnvelope.sustain"
                    :min="0"
                    :max="1"
                    width="200px"
                    :step="0.1"
                    @change="updateVoiceSustain"></mib-slider>
        <mib-slider class="control"
                    label ="Release"
                    :init="synth.voiceEnvelope.release"
                    :min="0.1"
                    :max="2"
                    width="200px"
                    :step="0.1"
                    @change="updateVoiceRelease"></mib-slider>
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

      <div class="controls">
        <mib-toggle label="On/Off"
                    :init="synth.filterEnvelope.active"
                    @change="toggleFilterEnvelope"></mib-toggle>

        <mib-slider class="control"
                    label ="Attack"
                    :init="synth.filterEnvelope.attack"
                    :min="0"
                    :max="2"
                    :step="0.01"
                    @change="updateFilterAttack"></mib-slider>

        <mib-slider class="control"
                    label ="Accent"
                    :init="synth.filterEnvelope.accent"
                    :min="0"
                    :max="15000"
                    width="300px"
                    valueWidth="120px"
                    @change="updateFilterAccent"></mib-slider>

        <mib-slider class="control"
                    label ="Decay"
                    :init="synth.filterEnvelope.decay"
                    :min="0.1"
                    :max="2"
                    width="300px"
                    :step="0.1"
                    valueWidth="120px"
                    @change="updateFilterDecay"></mib-slider>
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
  import { Synth04 } from '@/core/synth/synth-04'
  import MibVisualizer from '@/components/synth/mib-visualizer.vue'
  import MibSpinBox from '@/components/synth/mib-spinbox.vue'
  import MibSlider from '@/components/synth/mib-slider.vue'
  import MibToggle from '@/components/synth/mib-toggle.vue'

  export default {
    components: {
      MibVisualizer,
      MibSpinBox,
      MibSlider,
      MibToggle,
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
      updateVoiceAttack(value) {
        this.synth.voiceEnvelope.attack = value
      },
      updateVoiceDecay(value) {
        this.synth.voiceEnvelope.decay = value
      },
      updateVoiceSustain(value) {
        this.synth.voiceEnvelope.sustain = value
      },
      updateVoiceRelease(value) {
        this.synth.voiceEnvelope.release = value
      },
      toggleVoiceEnvelope(value) {
        this.synth.voiceEnvelope.active = value
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
      updateFilterAttack(value) {
        this.synth.filterEnvelope.attack = value
      },
      updateFilterAccent(value) {
        this.synth.filterEnvelope.accent = value
      },
      updateFilterDecay(value) {
        this.synth.filterEnvelope.decay = value
      },
      toggleFilterEnvelope(value) {
        this.synth.filterEnvelope.active = value
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
      this.synth = Synth04(this.audioContext)
      this.output = Output(this.audioContext)
      this.synth.connect(this.output)
      this.keyboard = Keyboard(this.synth)
      this.keyboard.octave = 3
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
