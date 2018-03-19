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
      <mib-monophonic-graph></mib-monophonic-graph>
    </slide>

    <slide enter='bounceInRight' leave='fadeOut'>
      <mib-monophonic-snippet></mib-monophonic-snippet>
    </slide>

    <slide enter='bounceInRight' leave='fadeOut' :mouseNavigation="false">
      <mib-monophonic-demo></mib-monophonic-demo>
    </slide>

    <slide enter='bounceInRight' leave='fadeOut'>
      <mib-polyphonic-snippet></mib-polyphonic-snippet>
    </slide>

    <slide enter='bounceInRight' leave='fadeOut'>
      <mib-polyphonic-snippet></mib-polyphonic-snippet>
    </slide>

    <slide enter='bounceInRight' leave='fadeOut' :mouseNavigation="false">
      <mib-additive-graph></mib-additive-graph>
    </slide>

    <slide enter='bounceInRight' leave='fadeOut'>
      <mib-additive-snippet></mib-additive-snippet>
    </slide>

    <slide enter='bounceInRight' leave='fadeOut' :mouseNavigation="false">
      <mib-additive-demo></mib-additive-demo>
    </slide>

    <slide enter='bounceInRight' leave='fadeOut'>
      <mib-substractive-graph></mib-substractive-graph>
    </slide>

    <slide enter='bounceInRight' leave='fadeOut' :mouseNavigation="false">
      <mib-substractive-demo></mib-substractive-demo>
    </slide>

    <slide enter='bounceInRight' :mouseNavigation="false" :steps="2">
      <mib-envelopes-demo :step="step"></mib-envelopes-demo>
    </slide>
  </div>
</template>

<script>
  import eagle from 'eagle.js'
  import MibTitle from './slides/mib-title.vue'
  import MibHistory from './slides/mib-history.vue'
  import MibMonophonicSnippet from './slides/monophonic-synthesis/snippet.vue'
  import MibMonophonicGraph from './slides/monophonic-synthesis/graph.vue'
  import MibMonophonicDemo from './slides/monophonic-synthesis/demo.vue'
  import MibPolyphonicSnippet from './slides/polyphonic-synthesis/snippet.vue'
  import MibPolyphonicGraph from './slides/polyphonic-synthesis/graph.vue'
  import MibPolyphonicDemo from './slides/polyphonic-synthesis/demo.vue'
  import MibAdditiveGraph from './slides/additive-synthesis/graph.vue'
  import MibAdditiveSnippet from './slides/additive-synthesis/snippet.vue'
  import MibAdditiveDemo from './slides/additive-synthesis/demo.vue'
  import MibSubstractiveGraph from './slides/substractive-synthesis/graph.vue'
  import MibSubstractiveDemo from './slides/substractive-synthesis/demo.vue'
  import MibEnvelopesDemo from './slides/envelopes/demo.vue'

  export default {
    mixins: [
      eagle.slideshow,
    ],
    components: {
      MibTitle,
      MibHistory,
      MibMonophonicGraph,
      MibPolyphonicGraph,
      MibAdditiveGraph,
      MibSubstractiveGraph,
      MibMonophonicSnippet,
      MibPolyphonicSnippet,
      MibAdditiveSnippet,
      MibMonophonicDemo,
      MibPolyphonicDemo,
      MibAdditiveDemo,
      MibSubstractiveDemo,
      MibEnvelopesDemo,
    },
  }
</script>
