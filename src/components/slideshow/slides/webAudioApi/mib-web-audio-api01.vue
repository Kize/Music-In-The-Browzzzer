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
      <li>Element de départ pour utiliser l'API</li>
      <li>Possède une liste de sorties (destination)</li>
      <li>Fournit le temps</li>
    </ul>

    <div class="snippet">
      <eg-code-block lang="javascript">
        const audioContext = new AudioContext()
        const destination = audioContext.destination

        audioContext.currentTime
      </eg-code-block>
    </div>
  </div>
</template>

<script>
  export default {}
</script>
