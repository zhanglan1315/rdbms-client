import store from 'store'
import axios from '@/core/axios'
import dependencies from '@/core/runtime'

const router = dependencies.router

export default {
  login (username, password) {
    return axios.post('auth/login', {
      username,
      password
    }).then(response => {
      store.set('token', response.data)
      router.push('/')
    })
  },

  async check () {
    await axios.post('auth/check')
  },

  async refresh () {
    const response = await axios.post('auth/refresh')

    return response.data
  }
}
