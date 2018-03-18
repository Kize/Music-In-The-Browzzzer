<style lang="scss" scoped>
  @import '../../assets/styles/colors.scss';

  .eg-slideshow {
    background-color: $bg-primary;
    height: 99%;
    width: 99%;
    overflow: hidden;

    .eg-slide {
      background-color: $bg-primary;

      .eg-slide-content {
        .slide {
          h2 {
            font-size: 1em;
          }

        }
      }
    }
  }
</style>

<template>
  <div class="eg-slideshow">
    <slide  :mouseNavigation="false">
      <mib-title></mib-title>
    </slide>

    <slide enter='bounceInRight' leave='fadeOut'>
      <mib-history></mib-history>
    </slide>

    <slide enter='bounceInRight' leave='fadeOut' :mouseNavigation="false">
      <mib-demo00></mib-demo00>
    </slide>

    <slide enter='bounceInRight' leave='fadeOut'>
      <mib-schema1></mib-schema1>
    </slide>

    <slide enter='bounceInRight' leave='fadeOut'>
      <mib-snippets01></mib-snippets01>
    </slide>

    <slide enter='bounceInRight' leave='fadeOut' :mouseNavigation="false">
      <mib-demo01></mib-demo01>
    </slide>

    <slide enter='bounceInRight' leave='fadeOut' :mouseNavigation="false">
      <mib-demo02></mib-demo02>
    </slide>

    <slide enter='bounceInRight' leave='fadeOut' :mouseNavigation="false">
      <mib-demo03></mib-demo03>
    </slide>

    <slide enter='bounceInRight' leave='fadeOut' :mouseNavigation="false">
      <mib-demo04></mib-demo04>
    </slide>
  </div>
</template>

<script>
  import eagle from 'eagle.js'
  import MibTitle from './slides/mib-title.vue'
  import MibHistory from './slides/mib-history.vue'
  import MibSnippets01 from './slides/mib-snippets01.vue'
  import MibSchema1 from './slides/mib-schema01.vue'
  import MibDemo00 from './slides/mib-demo00.vue'
  import MibDemo01 from './slides/mib-demo01.vue'
  import MibDemo02 from './slides/mib-demo02.vue'
  import MibDemo03 from './slides/mib-demo03.vue'
  import MibDemo04 from './slides/mib-demo04.vue'

  export default {
    mixins: [
      eagle.slideshow,
    ],
    components: {
      MibTitle,
      MibHistory,
      MibSchema1,
      MibSnippets01,
      MibDemo00,
      MibDemo01,
      MibDemo02,
      MibDemo03,
      MibDemo04,
    },
  }
</script>
