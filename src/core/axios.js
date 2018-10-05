import Vue from 'vue'
import Axios from 'axios'

const local = true
const LOCAL_URL = 'http://mdn.test'
const SERVER_URL = 'https://api.zhanglan.tech:7000'

if (Vue.config.productionTip === false || local === false) {
  Axios.defaults.baseURL = SERVER_URL
} else {
  Axios.defaults.baseURL = LOCAL_URL
}

const Http = Axios.create()

// custome axios
export default Axios

// primary axios
export const http = Http
