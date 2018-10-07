import Vue from 'vue'
import Component from './component'
import { sleep } from '@/utils/async'

const instance = new Vue({
  render: h => h(Component)
}).$mount().$children[0]

document.body.appendChild(instance.$el)

export const Waiting = {
  start () {
    instance.show = true
  },

  finish () {
    instance.show = false
  }
}

export async function Wait (callback) {
  instance.show = true
  try {
    await sleep(666)
    await callback()
  } finally {
    instance.show = false
  }
}
