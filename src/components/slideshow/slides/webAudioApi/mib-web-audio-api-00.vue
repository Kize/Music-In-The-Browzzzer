<style lang="scss" scoped>
  @import '../../../../assets/styles/slide';

  .slide {
    h1 {
      color: black;
    }

    .content ul {
      font-size: 2em;

      li:last-child {
        margin-bottom: 250px;
      }
    }
  }

</style>

<template>
  <div class="slide">
    <h2>Web Audio API</h2>

    <div class="content">
      <ul>
        <li v-if="step >= 2">Native</li>
        <li v-if="step >= 3">Temps réel</li>
        <li v-if="step >= 4">Modulaire</li>
      </ul>
    </div>
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
