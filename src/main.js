import Vue from 'vue'

import App from '@/views'
import store from './packages/vuex'
import router from './packages/vue-router'

import clickoutside from '@/directives/clickoutside'
import { Wait, Waiting } from '@/components/waiting'

Vue.directive('clickoutside', clickoutside)

Vue.prototype.$wait = Wait
Vue.prototype.$waiting = Waiting

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
