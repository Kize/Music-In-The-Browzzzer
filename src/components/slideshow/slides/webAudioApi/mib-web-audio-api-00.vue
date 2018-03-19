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

    <ul>
      <li v-if="step >= 2">API native HTML5</li>
      <li v-if="step >= 3">Capable de contrôler des données audio en temps réel</li>
      <li v-if="step >= 4">Basé sur le routing modulaire</li>
    </ul>
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
