import Vue from 'vue'
import Vuex from 'vuex'
import store from '@/store'

Vue.use(Vuex)

const AppStore = new Vuex.Store(store)

export default AppStore

export function getNamespacedStore (namespace) {
  return AppStore._modulesNamespaceMap[namespace + '/'].context
}
