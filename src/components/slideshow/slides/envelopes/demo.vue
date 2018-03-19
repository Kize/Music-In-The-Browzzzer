<style lang="scss" scoped>
  @import '../../../../assets/styles/slide';

</style>

<template>
  <div class="slide">
    <h2>Envelopes</h2>
    <mib-preset01 v-if="step === 1"></mib-preset01>
    <mib-preset02 v-if="step === 2"></mib-preset02>
  </div>
</template>

<script>
  import MibPreset01 from './demo-preset-01.vue'
  import MibPreset02 from './demo-preset-02.vue'

  export default {
    components: {
      MibPreset01,
      MibPreset02,
    },
    props: {
      step: {
        type: Number,
        default: 1,
      },
    },
  }
</script>
