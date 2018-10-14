import axios from '@/core/axios'

export default {
  login (username, password) {
    return axios.post('auth/login', {
      username,
      password
    })
  },

  check () {
    return axios.post('auth/check')
  },

  async refresh () {
    const response = await axios.post('auth/refresh')

    return response.data
  }
}
