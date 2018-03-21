<style lang="scss" scoped>
  @import '../../../../assets/styles/slide';

  .slide {
    .snippet {
      margin-top: -100px;
    }
  }
</style>

<template>
  <div class="slide">
    <h2>Synthèse additive</h2>

    <div class="snippet">
      <eg-code-block lang="javascript">
        noteOn(frequency, time = audioContext.currentTime) {
          osc1.type = 'sine'
          osc2.type = 'sawtooth'
          osc1.frequency.setValueAtTime(frequency, time)
          osc2.frequency.setValueAtTime(frequency, time)
          osc1.connect(output)
          osc2.connect(output)
          osc1.start(time)
          osc2.start(time)
        },
        noteOff(time) {
          osc1.stop(time)
          osc2.stop(time)
        },

        noteOn(440, audioContext.currentTime)
        noteOff(audioContext.currentTime + 1)
      </eg-code-block>
    </div>
  </div>
</template>

<script>
  export default {}
</script>
