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
    <h3>Les paramètres audios</h3>

    <ul>
      <li v-if="step >= 2">
        De deux types :
        <ul v-if="step >= 3">
          <li>a-rate</li>
          <li>k-rate</li>
        </ul>
      </li>
      <li v-if="step >= 4">Possibilité de réglages de la valeur en fonction du temps</li>
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
