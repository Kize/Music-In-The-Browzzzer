<style scoped lang="scss">
  @import '../../../../assets/styles/synth-card';

  .card.lfo {
    width: 25vw;
    margin: $margin-int $margin-ext $margin-ext $margin-int;
    display: flex;

    & > div {
      margin: auto;
      height: 100%;
      box-sizing: border-box;
    }

    .knobs {
      width: 60%;
    }

    .toggles {
      width: 40%;
    }
  }
</style>

<template>
  <div class="card lfo">
    <div class="knobs">
      <knob label="amount" :value="1" :width="180"></knob>
      <knob label="rate" :value="1" :width="130"></knob>
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
