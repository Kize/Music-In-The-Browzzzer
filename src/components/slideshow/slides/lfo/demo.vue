<style lang="scss" scoped>
  @import '../../../../assets/styles/slide';

</style>

<template>
  <div class="slide">
    <h2>Low Frequency Oscillators</h2>
    <mib-preset01 v-if="step === 1"></mib-preset01>
  </div>
</template>

<script>
  import MibPreset01 from './demo-preset-01.vue'

  export default {
    components: {
      MibPreset01,
    },
    props: {
      step: {
        type: Number,
        default: 1,
      },
    },
  }
</script>
