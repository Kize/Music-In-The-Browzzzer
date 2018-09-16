<style lang="scss" scoped>
  @import '../../../../assets/styles/synth-card';

  .card {
    width: 50vw;
    margin: $margin-ext $margin-int $margin-int $margin-ext;
    display: flex;

    .knobs {
      position: relative;
      display: flex;
      flex-direction: column;

      .osc-title {
        font-size: $input-label-size;
        position: absolute;
        left: 18px;
        top: 15px;
      }
    }

  }

</style>

<template>
  <div class="card">
    <div class="knobs">
      <span class="osc-title">Osc1</span>
      <knob class="osc-1" label="square" :value="1" :width="180" @update="setSquareGainValue"></knob>
      <knob class="osc-2" label="detune" :value="1" :width="130"></knob>
    </div>

    <div class="knobs">
      <span class="osc-title">Osc2</span>
      <knob label="sawtooth" :value="1" :width="180" @update="setSawGainValue"></knob>
      <knob label="detune" :value="1" :width="130"></knob>
    </div>

    <div class="knobs">
      <knob class="fm-amount" label="fm amount" :value="1" :width="180" @update="setFmAmount"></knob>
      <knob class="fm-ratio" label="fm ratio" :value="1" :width="130" @update="setFmRatio"></knob>
    </div>
  </div>
</template>

<script>
  import Knob from './knob.vue'
  import { Dispatcher } from 'wasa'

  export default {
    components: {
      Knob,
    },
    methods: {
      setSquareGainValue(value) {
        Dispatcher.dispatch('SQUARE_GAIN_CHANGED', value)
      },
      setSawGainValue(value) {
        Dispatcher.dispatch('SAW_GAIN_CHANGED', value)
      },
      setFmAmount(value) {
        Dispatcher.dispatch('FM_AMOUNT_CHANGED', value)
      },
      setFmRatio(value) {
        Dispatcher.dispatch('FM_RATIO_CHANGED', value)
      },
    },
  }
</script>
