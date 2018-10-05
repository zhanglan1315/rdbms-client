import Vue from 'vue'
import store from './vuex'
import router from './router'
import AppComponent from '@/app'

export const App = new Vue({
  store,
  router,
  render: h => h(AppComponent),
}).$mount('#app')
