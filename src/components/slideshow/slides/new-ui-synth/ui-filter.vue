<style lang="scss" scoped>
  @import '../../../../assets/styles/synth-card';

  .card.filters {
    width: 25vw;
    margin: $margin-int $margin-int $margin-ext $margin-ext;
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
  <div class="card filters">
    <div class="knobs">
      <knob class="filter-frequency" label="frequency" :value="1" :width="180"></knob>
      <knob label="peak" :value="1" :width="130"></knob>
    </div>
    <div class="toggles">
      <selector :values="['square', 'triangle', 'sine']"></selector>
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
