<style lang="scss" scoped>
  .slide {
    h1 {
      color: black;
    }

    .snippet {
      width: 60%;
      margin: auto;
    }
  }

</style>

<template>
  <div class="slide">
    <h2>Web Audio API</h2>
    <h3>Le contexte</h3>

    <ul>
      <li v-if="step >= 2">Met à disposition une horloge</li>
      <li v-if="step >= 3">Permet de créer des noeuds audio</li>
      <li v-if="step >= 4">Fournit la fréquence d'échantillonage</li>
    </ul>

    <div class="snippet" v-if="step >= 5">
      <eg-code-block lang="javascript">
        const audioContext = new AudioContext()
        const currentTime = audioContext.currentTime
        const osc = audioContext.createOscillator()
        audioContext.sampleRate
      </eg-code-block>
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
