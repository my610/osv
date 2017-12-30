import Vue from 'vue'
// import axios from 'axios'

import App from './App.vue'
import router from './router'
// import store from './store'
import aside from './components/aside.vue'
import vmodal from 'vue-js-modal'

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
// Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false
Vue.use(vmodal)
Vue.component('app-aside', aside)

/* eslint-disable no-new */
new Vue({
  components: {App},
  router,
  // store,
  template: '<App/>'
}).$mount('#app')
