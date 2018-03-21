<style lang="scss" scoped>
  @import '../../../../assets/styles/slide';

  .slide {
    .snippet {
      margin-top: -150px;
    }
  }
</style>

<template>
  <div class="slide">
    <h2>Web Audio Api</h2>

    <div class="snippet">
      <eg-code-block lang="javascript">
        const audioContext = new AudioContext()
        const osc = audioContext.createOscillator()
        const output = audioContext.createGain()

        /* routing */
        osc.connect(gain).connect(audioContext.destination)

        output.gain.setValueAtTime(1, audioContext.currentTime)
      </eg-code-block>
    </div>
  </div>
</template>

<script>
  export default {}
</script>
