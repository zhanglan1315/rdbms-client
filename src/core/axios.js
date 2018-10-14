import Vue from 'vue'
import Axios from 'axios'
import store from '@/core/vuex'
import get from 'lodash/get'

const local = true
const LOCAL_URL = 'http://rdbms.test'
const SERVER_URL = 'https://api.zhanglan.tech:7000'

if (Vue.config.productionTip === false || local === false) {
  Axios.defaults.baseURL = SERVER_URL
} else {
  Axios.defaults.baseURL = LOCAL_URL
}

Axios.interceptors.request.use(
  config => {
    const token = get(store.state, 'token.token.token')

    if (token) {
      config.headers.Authorization = token
    }

    return config
  }
)

Axios.interceptors.response.use(
  response => {
    if (store.state.error.network) {
      store.commit('error/setNetwork', false)
    }

    return response
  },

  error => {
    if (error.message === 'Network Error') {
      if (!store.state.error.network) {
        store.commit('error/setNetwork', true)
      }
    }

    throw error
  }
)

const Http = Axios.create()

// custome axios
export default Axios

// primary axios
export const http = Http
