import Vue from 'vue'
import router from './router'
import AppComponent from '@/app'

export const App = new Vue({
  router,
  render: h => h(AppComponent),
}).$mount('#app')
