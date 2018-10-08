import axios from '@/core/axios'

let connectionId = null

export default {
  setConnectionId (id) {
    connectionId = id
  },

  async test (params) {
    await axios.post('postgres/test', params)
  },

  async connect () {
    await axios.post('postgres/connect', {
      connectionId
    })
  }
}
