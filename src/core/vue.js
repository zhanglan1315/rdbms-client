import Vue from 'vue'
import store from './vuex'
import router from './router'
import AppComponent from '@/app'
import { Wait, Waiting } from '@/components/waiting'

Vue.prototype.$wait = Wait
Vue.prototype.$waiting = Waiting

export const App = new Vue({
  store,
  router,
  render: h => h(AppComponent),
}).$mount('#app')
