// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Eagle from 'eagle.js'
import App from './App'

// import eagle.js default styles
import 'eagle.js/dist/eagle.css'
// import animate.css for slide transition
import 'animate.css'
// highlight.js style
import 'highlight.js/styles/github.css'
// material icons
import 'material-design-icons/iconfont/material-icons.css'

Vue.config.productionTip = false

Vue.use(Eagle)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: {
    App,
  },
  template: '<App/>',
})
