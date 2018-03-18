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

    <slide enter='bounceInRight' leave='fadeOut'>
      <mib-schema00></mib-schema00>
    </slide>

    <slide enter='bounceInRight' leave='fadeOut'>
      <mib-snippets00></mib-snippets00>
    </slide>

    <slide enter='bounceInRight' leave='fadeOut' :mouseNavigation="false">
      <mib-demo00></mib-demo00>
    </slide>

    <slide enter='bounceInRight' leave='fadeOut'>
      <mib-schema01></mib-schema01>
    </slide>

    <slide enter='bounceInRight' leave='fadeOut'>
      <mib-snippets01></mib-snippets01>
    </slide>

    <slide enter='bounceInRight' leave='fadeOut' :mouseNavigation="false">
      <mib-demo01></mib-demo01>
    </slide>

    <slide enter='bounceInRight' leave='fadeOut'>
      <mib-schema02></mib-schema02>
    </slide>

    <slide enter='bounceInRight' leave='fadeOut' :mouseNavigation="false">
      <mib-demo02></mib-demo02>
    </slide>

    <slide enter='bounceInRight' leave='fadeOut'>
      <mib-schema03></mib-schema03>
    </slide>

    <slide enter='bounceInRight' leave='fadeOut' :mouseNavigation="false">
      <mib-demo03></mib-demo03>
    </slide>

    <slide enter='bounceInRight' :mouseNavigation="false">
      <mib-demo04></mib-demo04>
    </slide>
    <slide leave='fadeOut' :mouseNavigation="false">
      <mib-demo0401></mib-demo0401>
    </slide>
  </div>
</template>

<script>
  import eagle from 'eagle.js'
  import MibTitle from './slides/mib-title.vue'
  import MibHistory from './slides/mib-history.vue'
  import MibSnippets00 from './slides/mib-snippets-00.vue'
  import MibSnippets01 from './slides/mib-snippets-01.vue'
  import MibSchema00 from './slides/mib-schema-00.vue'
  import MibSchema01 from './slides/mib-schema-01.vue'
  import MibSchema02 from './slides/mib-schema-02.vue'
  import MibSchema03 from './slides/mib-schema-03.vue'
  import MibDemo00 from './slides/mib-demo-00.vue'
  import MibDemo01 from './slides/mib-demo-01.vue'
  import MibDemo02 from './slides/mib-demo-02.vue'
  import MibDemo03 from './slides/mib-demo-03.vue'
  import MibDemo04 from './slides/mib-demo-04.vue'
  import MibDemo0401 from './slides/mib-demo-04-01.vue'

  export default {
    mixins: [
      eagle.slideshow,
    ],
    components: {
      MibTitle,
      MibHistory,
      MibSchema00,
      MibSchema01,
      MibSchema02,
      MibSchema03,
      MibSnippets00,
      MibSnippets01,
      MibDemo00,
      MibDemo01,
      MibDemo02,
      MibDemo03,
      MibDemo04,
      MibDemo0401,
    },
  }
</script>
