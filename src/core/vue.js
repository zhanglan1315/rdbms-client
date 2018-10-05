import Vue from 'vue'
import AppComponent from '@/app'

export const App = new Vue({
  render: h => h(AppComponent),
}).$mount('#app')
