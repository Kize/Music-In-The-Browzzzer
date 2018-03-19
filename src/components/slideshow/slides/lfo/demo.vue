<style lang="scss" scoped>

  .slide {
    h1 {
      color: black;
    }
    .synth {
      width: 1000px;
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
    <h2>LFO</h2>
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
