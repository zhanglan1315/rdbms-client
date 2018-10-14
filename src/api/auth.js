import axios from '@/core/axios'

export default {
  login (username, password) {
    return axios.post('auth/login', {
      username,
      password
    })
  },

  register (params) {
    return axios.post('users', params)
  },

  check () {
    return axios.post('auth/check')
  }
}
