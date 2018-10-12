import Vue from 'vue'
import store from './vuex'
import router from './router'
import AppComponent from '@/app'
import dependencies from './runtime'
import { Wait, Waiting } from '@/components/waiting'

Vue.prototype.$wait = Wait
Vue.prototype.$waiting = Waiting

const app = new Vue({
  store,
  router,
  render: h => h(AppComponent),
}).$mount('#app')

dependencies.vue = app
dependencies.store = store
dependencies.router = router
