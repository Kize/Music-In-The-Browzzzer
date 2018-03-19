<style lang="scss">
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
          h1 {
            font-size: 2.5em;
            margin: 0.3em;
          }

          h2 {
            font-size: 2em;
            margin: 0.3em;
          }

          h3 {
            font-size: 1.3em;
          }

          ul {
            margin: auto;
            text-align: left;
            width: 40%;
          }

        }
      }
    }
  }
</style>

<template>
  <div class="eg-slideshow">
    <slide :mouseNavigation="false">
      <mib-title></mib-title>
    </slide>

    <!--HISTORY-->
    <slide enter='bounceInRight' leave='fadeOut'>
      <mib-history></mib-history>
    </slide>

    <!--WEB AUDIO API-->
    <slide enter='bounceInRight' leave='fadeOut'>
      <mib-web-audio-api00></mib-web-audio-api00>
    </slide>

    <slide enter='bounceInRight' leave='fadeOut' :steps="5">
      <mib-web-audio-api01 :step="step"></mib-web-audio-api01>
    </slide>

    <slide enter='bounceInRight' leave='fadeOut'>
      <mib-web-audio-api02></mib-web-audio-api02>
    </slide>

    <slide enter='bounceInRight' leave='fadeOut'>
      <mib-web-audio-api03></mib-web-audio-api03>
    </slide>

    <slide enter='bounceInRight' leave='fadeOut'>
      <mib-web-audio-api04></mib-web-audio-api04>
    </slide>

    <!--DEMO-->
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
  import MibWebAudioApi00 from './slides/webAudioApi/mib-web-audio-api-00'
  import MibWebAudioApi01 from './slides/webAudioApi/mib-web-audio-api-01'
  import MibWebAudioApi02 from './slides/webAudioApi/mib-web-audio-api-02'
  import MibWebAudioApi03 from './slides/webAudioApi/mib-web-audio-api-03'
  import MibWebAudioApi04 from './slides/webAudioApi/mib-web-audio-api-04'
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
      MibWebAudioApi00,
      MibWebAudioApi01,
      MibWebAudioApi02,
      MibWebAudioApi03,
      MibWebAudioApi04,
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
