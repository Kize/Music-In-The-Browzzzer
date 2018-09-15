<style scoped lang="scss">
  @import '../../../../assets/styles/synth-card';

  .card.lfo {
    width: 25vw;
    margin: $margin-int $margin-ext $margin-ext $margin-int;
    display: flex;
    /*align-items: center;*/
    /*justify-content: center;*/

    & > div {
      margin: auto;
      height: 100%;
      box-sizing: border-box;
    }

    .knobs {
      width: 60%;

      .knob {
        display: block;
        margin: 10px auto 0 auto;
      }
    }

    .toggles {
      width: 40%;
    }
  }
</style>

<template>
  <div class="card lfo">
    <div class="knobs">
      <knob class="knob" label="amount" :value="1" :width="180"></knob>
      <knob class="knob small" label="rate" :value="1" :width="130"></knob>
    </div>
    <div class="toggles">
      <selector :values="['lowpass', 'highpass', 'bandpass']"></selector>
    </div>
  </div>
</template>

<script>
  import Knob from './knob.vue'
  import Toggle from './toggle.vue'
  import Selector from './selector.vue'

  export default {
    components: {
      Knob,
      Toggle,
      Selector,
    },
  }
</script>
