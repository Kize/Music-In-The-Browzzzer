<style lang="scss" scoped>
  @import '../../../../assets/styles/slide';

</style>

<template>
  <div class="slide">
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
                    label="Attack"
                    :init="synth.voiceEnvelope.attack"
                    :min="0"
                    :max="1"
                    :step="0.1"
                    width="200px"
                    @change="updateVoiceAttack"></mib-slider>

        <mib-slider class="control"
                    label="Decay"
                    :init="synth.voiceEnvelope.decay"
                    :min="0"
                    :max="1"
                    :step="0.1"
                    width="200px"
                    @change="updateVoiceDecay"></mib-slider>

        <mib-slider class="control"
                    label="Sustain"
                    :init="synth.voiceEnvelope.sustain"
                    :min="0"
                    :max="1"
                    width="200px"
                    :step="0.1"
                    @change="updateVoiceSustain"></mib-slider>
        <mib-slider class="control"
                    label="Release"
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
                    valueWidth="80px"
                    @change="updateFilterPeak"></mib-slider>
        <mib-slider class="control"
                    label="Filter detune"
                    :init="synth.filter.detune.value"
                    width="180px"
                    @change="updateFilterDetune"></mib-slider>
      </div>

      <div class="controls">
        <mib-toggle label="On/Off"
                    :init="synth.filterEnvelope.active"
                    @change="toggleFilterEnvelope"></mib-toggle>

        <mib-slider class="control"
                    label="Attack"
                    :init="synth.filterEnvelope.attack"
                    :min="0"
                    :max="2"
                    :step="0.01"
                    @change="updateFilterAttack"></mib-slider>

        <mib-slider class="control"
                    label="Accent"
                    :init="synth.filterEnvelope.accent"
                    :min="0"
                    :max="15000"
                    width="300px"
                    valueWidth="120px"
                    @change="updateFilterAccent"></mib-slider>

        <mib-slider class="control"
                    label="Decay"
                    :init="synth.filterEnvelope.decay"
                    :min="0.1"
                    :max="2"
                    width="300px"
                    :step="0.1"
                    valueWidth="120px"
                    @change="updateFilterDecay"></mib-slider>
      </div>

      <div class="controls">
        <mib-spin-box label="Destination"
                      class="control"
                      :values="synth.lfoDestinations"
                      :init="synth.lfo1.destination"
                      width="190px"
                      @change="updateLfo1Destination"></mib-spin-box>

        <mib-spin-box class="control"
                      label="Waveform"
                      :values="synth.waveForms"
                      :init="synth.lfo1.waveForm"
                      @change="updateLfo1WaveForm"></mib-spin-box>

        <mib-slider class="control"
                    label="Frequency"
                    :init="synth.lfo1.frequency"
                    :min="0"
                    :max="15"
                    :step="0.01"
                    width="230px"
                    @change="updateLfo1Frequency"></mib-slider>

        <mib-slider class="control"
                    label="Amplitude"
                    :init="synth.lfo1.amplitude"
                    :min="0"
                    :max="700"
                    :step="0.01"
                    width="230px"
                    @change="updateLfo1Amplitude"></mib-slider>
      </div>

      <div class="controls">
        <mib-spin-box label="Destination"
                      class="control"
                      :values="synth.lfoDestinations"
                      :init="synth.lfo2.destination"
                      width="190px"
                      @change="updateLfo1Destination"></mib-spin-box>

        <mib-spin-box class="control"
                      label="Waveform"
                      :values="synth.waveForms"
                      :init="synth.lfo2.waveForm"
                      @change="updateLfo1WaveForm"></mib-spin-box>

        <mib-slider class="control"
                    label="Frequency"
                    :init="synth.lfo2.frequency"
                    :min="0"
                    :max="15"
                    :step="0.01"
                    width="230px"
                    @change="updateLfo2Frequency"></mib-slider>

        <mib-slider class="control"
                    label="Amplitude"
                    :init="synth.lfo2.amplitude"
                    :min="0"
                    :max="700"
                    :step="0.01"
                    width="230px"
                    @change="updateLfo2Amplitude"></mib-slider>
      </div>

      <mib-visualizer class="visualizer"
                      :width="1000"
                      :height="height"
                      :analyzer="output.analyzer"></mib-visualizer>
    </div>
  </div>
</template>

<script>
  import { Keyboard } from '@/core/keyboard'
  import { Output } from '@/core/output'
  import { LFOSynth } from '@/core/synth/lfo-synth'
  import { WaveForms } from '@/core/waveforms'
  import { FilterTypes } from '@/core/filter-types'
  import { LFODestinations } from '@/core/lfo-destinations'
  import MibVisualizer from '@/components/synth/mib-visualizer.vue'
  import MibSpinBox from '@/components/synth/mib-spinbox.vue'
  import MibSlider from '@/components/synth/mib-slider.vue'
  import MibToggle from '@/components/synth/mib-toggle.vue'
  import { createMidiTrack } from '@/core/midi/midi-track'
  import { arkanoid } from '../../../../core/midi/midi-events/arkanoid-events'

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
      updateLfo1Destination(value) {
        this.synth.lfo1Destination = value
      },
      updateLfo1WaveForm(value) {
        this.synth.lfo1.waveForm = value
      },
      updateLfo1Frequency(value) {
        this.synth.lfo1.frequency = value
      },
      updateLfo1Amplitude(value) {
        this.synth.lfo2.frequency = value
      },
      updateLfo2Frequency(value) {
        this.synth.lfo1.amplitude = value
      },
      updateLfo2Amplitude(value) {
        this.synth.lfo2.amplitude = value
      },
    },
    computed: {
      width() {
        return innerWidth * 0.75
      },
      height() {
        return innerHeight * 0.3
      },
    },
    created() {
      this.audioContext = new AudioContext()
      this.synth = LFOSynth(this.audioContext)
      this.output = Output(this.audioContext)
      this.synth.connect(this.output)
      this.synth.filterEnvelope.active = false
      this.synth.filter.type = FilterTypes.BAND_PASS
      this.synth.filter.Q.value = 0.1
      this.synth.filter.frequency.value = 1400

      this.synth.lfo1Destination = LFODestinations.PEAK
      this.synth.lfo1.frequency = 2.5
      this.synth.lfo1.amplitude = 350
      this.synth.lfo1.waveForm = WaveForms.SQUARE

      this.synth.lfo2Destination = LFODestinations.FILTER_FREQUENCY
      this.synth.lfo2.frequency = 5
      this.synth.lfo2.amplitude = 700
      this.synth.lfo2.waveForm = WaveForms.SQUARE

      this.midiTrack = createMidiTrack(this.audioContext, arkanoid).setSlave(this.synth)
      this.keyboard = Keyboard(this.synth, this.midiTrack)
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
