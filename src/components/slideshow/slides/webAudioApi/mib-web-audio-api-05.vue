<style lang="scss" scoped>
  .slide {
    h1 {
      color: black;
    }
  }

</style>

<template>
  <div class="slide">
    <h2>Web Audio API</h2>
    <h3>Debug ?</h3>

    <p v-if="step >= 2">Compliqué avec le <b>fire-and-forget</b></p>

    <p v-if="step >= 3">Debuggable nativement sous Firefox</p>

    <p v-if="step >= 4">Extension <i>stable</i> sous Chrome</p>
  </div>
</template>

<script>
  export default {
    props: {
      step: {
        type: Number,
        default: 1,
      },
    },
  }
</script>
