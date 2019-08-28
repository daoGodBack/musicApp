// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import store from './store'
import 'common/stylus/index.styl'
import router from './router'
import fastclick from 'fastclick'
import lazyload from 'vue-lazyload'

fastclick.attach(document.body)

Vue.use(lazyload, {
  loading: require('common/image/default.png')
})

Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})