import axios from '@/core/axios'

export default {
  async login (params) {
    const response = await axios.post('auth/login', params)

    return response.data
  },

  async check () {
    await axios.post('auth/check')
  },

  async refresh () {
    const response = await axios.post('auth/refresh')

    return response.data
  }
}
