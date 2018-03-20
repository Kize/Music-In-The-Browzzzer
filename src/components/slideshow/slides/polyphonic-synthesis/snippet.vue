<style lang="scss" scoped>
  @import '../../../../assets/styles/slide';

</style>

<template>
  <div class="slide">
    <h2>Synthèse polyphonique</h2>

    <div class="snippet">
      <eg-code-block lang="javascript">
        let oscs = {}

        function noteOn(frequency, time = audioContext.currentTime) {
          const osc = audioContext.createOscillator()
          osc.frequency.setTargetAtTime(frequency, time, 0.001)
          osc.connect(output)
          osc.start(time)
          oscs[frequency] = osc
        }

        function noteOff(frequency, time = audioContext.currentTime) {
          oscs[frequency].stop(time)
        }

        noteOn(440, audioContext.currentTime)
        noteOn(220, audioContext.currentTime)
        noteOff(440, audioContext.currentTime + 1)
        noteOff(220, audioContext.currentTime + 1)
      </eg-code-block>
    </div>
  </div>
</template>

<script>
  export default {}
</script>
