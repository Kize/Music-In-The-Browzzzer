<style lang="scss"  type="text/scss" scoped>
  .slide {
    h1 {
      color: black;
    }
  }

</style>

<template>
  <div class="slide">
    <h2>One Osc Synthesizer</h2>
  </div>
</template>

<script>
  import { Keyboard } from '../../../core/keyboard'
  import { Synth01 } from '../../../core/synth/synth-01'
  import { Output } from '../../../core/output'

  export default {
    created() {
      this.audioContext = new AudioContext()
      this.synth = Synth01(this.audioContext)
      this.synth.connect(Output(this.audioContext))
      this.keyboard = Keyboard(this.synth)
      this.keyboard.init()
    },
    destroyed() {
      console.log('destroyed')
      this.keyboard.destroy()
      this.audioContext.close()
    },
  }
</script>
