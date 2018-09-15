<style scoped lang="scss">
  .envelope {
    width: 200px;
    height: 300px;
    /*border-right: gray 4px solid;*/
    background-color: #fdfdfd;
    border-radius: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    .slider {
      margin: 0 10px 0 10px;
    }
    .label {
      font-size: 13px;
      text-align: center;
      display: block;
      margin: 0 auto;
      color: gray;
      font-family: "Lucida Console", Monaco, monospace;
    }
  }

</style>

<template>
  <div class="envelope">
    <slider :width="30" :height="100" label="attack"></slider>
    <slider :width="30" :height="100" label="decay"></slider>
    <slider :width="30" :height="100"label="sustain"></slider>
    <slider v-if="type === 'adsr'" :width="30" :height="100" label="release"></slider>
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
