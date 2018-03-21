<style lang="scss" scoped>
  @import '../../../../assets/styles/slide';

</style>

<template>
  <div class="slide">
    <h2>Synthèse monophonique</h2>

    <div class="snippet">
      <eg-code-block lang="javascript">
        osc.type = 'sawtooth'
        output.gain.value = 0
        osc.start(time)

        function noteOn(frequency, time = audioContext.currentTime) {
          osc.frequency.setValueAtTime(frequency, time)
          output.gain.setValueAtTime(1, time)
        }

        function noteOff(time = audioContext.currentTime) {
          output.gain.setValueAtTime(0, time)
        }

        noteOn(440, audioContext.currentTime)
        noteOff(audioContext.currentTime + 1)
      </eg-code-block>
    </div>
  </div>
</template>

<script>
  export default {}
</script>
