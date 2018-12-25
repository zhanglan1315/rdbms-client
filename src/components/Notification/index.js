import Vue from 'vue'
import Wrapper from './Wrapper'

export default {
  vNode: null,

  component: Wrapper,

  register (vNode) {
    this.vNode = vNode
    Vue.prototype.$notification = this.vNode
  }
}
