<style lang="scss" scoped>
  .card {
    width: 400px;
    height: 300px;
    /*border-right: gray 4px solid;*/
    background-color: #fdfdfd;
    border-radius: 15px;
    display: flex;
    align-items: center;
    justify-content: center;

    .osc {
      .waves {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        .knobs {
          .knob {
            display: block;
            margin: 10px auto 0 auto;
          }
        }
      }
    }
  }

</style>

<template>
  <div class="card">
    <div class="osc">
      <div class="waves">
        <div class="knobs">
          <knob class="knob" label="square" :value="1" :width="100" @update="setSquareGainValue"></knob>
          <knob class="knob small" label="detune" :value="1" :width="60"></knob>
        </div>
        <div class="knobs">
          <knob class="knob" label="sawtooth" :value="1" :width="100" @update="setSawGainValue"></knob>
          <knob class="knob small" label="detune" :value="1" :width="60"></knob>
        </div>
        <div class="knobs">
          <knob class="knob" label="fm amount" :value="1" :width="100" @update="setFmAmount"></knob>
          <knob class="knob" label="fm ratio" :value="1" :width="60" @update="setFmRatio"></knob>

          <!--<knob class="knob small" label="detune" :value="1" :width="60"></knob>-->
        </div>
        <div class="knobs">
          <!--<knob class="knob small" label="detune" :value="1" :width="60"></knob>-->
        </div>
      </div>
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
