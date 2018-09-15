<style lang="scss" scoped>
  .filters {
    width: 200px;
    height: 300px;
    background-color: #fdfdfd;
    border-radius: 15px;
    display: flex;
    justify-content: space-evenly;
    .knobs {
      .knob {
        display: block;
        /*width: 100px;*/
        margin: 10px auto 0 auto;
        &.small {
          /*width: 60px;*/
        }
      }
    }
    .toggles {
      height: 200px;
      display: flex;
      flex-direction: column;
      align-items: center;
      align-self: center;
    }
  }
</style>

<template>
  <div class="filters">
    <div class="knobs">
      <knob class="knob" label="frequency" :value="1" :width="100"></knob>
      <knob class="knob small" label="peak" :value="1" :width="80"></knob>
    </div>
    <div class="toggles">
      <selector :values="['square', 'triangle', 'sine']"></selector>
    </div>
  </div>
</template>

<script>
  import Knob from '../../../synth/knob.vue'
  import Toggle from '../../../synth/toggle.vue'
  import Selector from './selector.vue'

  export default {
    components: {
      Knob,
      Toggle,
      Selector,
    },
  }
</script>
