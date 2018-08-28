import Vue from 'vue'
import Router from 'vue-router'
import MibSlideShow from './components/slideshow/mib-slideshow'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/1/1',
    },
    {
      path: '/:slide/:step',
      name: 'home',
      component: MibSlideShow,
    },
  ],
})
