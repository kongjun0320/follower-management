import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'

import 'normalize.css/normalize.css'
import './styles/reset.css'

import * as request from './api'

Vue.config.productionTip = false
Vue.prototype.$req = request

new Vue({
  router,
  render: (h) => h(App)
}).$mount('#app')
