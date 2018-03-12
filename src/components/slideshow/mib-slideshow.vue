<style lang="scss" scoped>
  @import '../../assets/styles/colors.scss';

  .eg-slideshow {
    background-color: $bg-primary;
    .eg-slide {
      background-color: $bg-primary;
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

    <slide enter='bounceInRight' leave='fadeOut'>
      <mib-snippets01></mib-snippets01>
    </slide>

    <slide enter='bounceInRight' leave='fadeOut'>
      <mib-demo01></mib-demo01>
    </slide>

    <slide enter='bounceInRight' leave='fadeOut'>
      <mib-demo02></mib-demo02>
    </slide>
  </div>
</template>

<script>
  import eagle from 'eagle.js'
  import MibTitle from './slides/mib-tile.vue'
  import MibHistory from './slides/mib-history.vue'
  import MibSnippets01 from './slides/mib-snippets01.vue'
  import MibDemo01 from './slides/mib-demo01.vue'
  import MibDemo02 from './slides/mib-demo02.vue'

  export default {
    mixins: [
      eagle.slideshow,
    ],
    components: {
      MibTitle,
      MibHistory,
      MibSnippets01,
      MibDemo01,
      MibDemo02,
    },
  }
</script>
