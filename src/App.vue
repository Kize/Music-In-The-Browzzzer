<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
</style>

<template>
  <div id="app">
    <mib-slide-show/>
  </div>
</template>

<script>
  import MibSlideShow from './components/slideshow/mib-slideshow.vue'

  export default {
    name: 'App',
    components: {
      MibSlideShow,
    },
  }
</script>
