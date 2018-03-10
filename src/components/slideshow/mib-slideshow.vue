<style scoped lang="scss">
  .eg-slideshow {
    background-color: whitesmoke;
    .eg-slide {
      background-color: whitesmoke;
      .eg-slide-content {
        .demo-slideshow {
          position: relative;
          width: 12em;
          height: 8em;
          margin: 0 auto;
        }
      }
    }
  }
</style>

<template>
  <div class="eg-slideshow">
    <slide>
      <mib-title></mib-title>
    </slide>

    <slide enter='bounceInRight' leave='fadeOut'>
      <mib-history></mib-history>
    </slide>
  </div>
</template>

<script>
  import eagle from 'eagle.js'
  import MibTitle from './slides/mib-tile.vue'
  import MibHistory from './slides/mib-history.vue'

  export default {
    mixins: [
      eagle.slideshow,
    ],
    components: {
      MibTitle,
      MibHistory,
    },
  }
</script>
