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
    <h3>Les noeuds</h3>

    <ul>
      <li v-if="step >= 2">Dépend de son contexte audio</li>
      <li v-if="step >= 3">Paramétrable <i>(Audio Param)</i></li>
      <li v-if="step >= 4">De différents types :
        <ul>
          <li v-if="step >= 5">Entrée</li>
          <li v-if="step >= 6">Traitement</li>
          <li v-if="step >= 7">Sortie</li>
          <li v-if="step >= 8">Synthèse</li>
        </ul>
      </li>
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
