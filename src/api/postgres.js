import axios from '@/core/axios'

export default {
  async test (params) {
    await axios.post('postgres/test', params)
  }
}
