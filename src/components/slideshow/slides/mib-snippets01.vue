<style lang="scss" scoped>
  .slide {

    .eg-code-block {
      display: flex;
      justify-content: center;
    }
  }

</style>

<template>
  <div class="slide">
    <h2>Oscillators</h2>

    <div class="snippet">
      <eg-code-block lang="javascript">
        const audioContext = new AudioContext()
        let osc

        function noteOn(frequency, time) {
          osc = audioContext.createOscillator()
          osc.frequency.value = frequency, 0.1
          osc.type = 'triangle'
          osc.connect(audioContext.destination)
          osc.start(time)
        }

        function noteOff(time) {
          osc.stop(time)
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
