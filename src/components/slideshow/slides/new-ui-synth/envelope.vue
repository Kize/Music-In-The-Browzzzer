<style scoped lang="scss">
  @import '../../../../assets/styles/synth-card';

  .card.envelope {
    width: 25vw;
    margin: $margin-int $margin-int $margin-ext $margin-int;
    display: flex;
    align-items: center;
    justify-content: center;

    .slider {
      margin: 0 10px 0 10px;
    }
  }

</style>

<template>
  <div class="card envelope">
    <slider :width="30" :height="160" label="attack"></slider>
    <slider :width="30" :height="160" label="decay"></slider>
    <slider :width="30" :height="160" label="sustain"></slider>
    <slider v-if="type === 'adsr'" :width="30" :height="160" label="release"></slider>
  </div>
</template>

<script>
  import Slider from './slider.vue'

  export default {
    props: {
      type: {
        type: String,
        default: 'accent',
      },
    },
    components: {
      Slider,
    },
  }
</script>
