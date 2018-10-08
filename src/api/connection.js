import axios from '@/core/axios'

export default {
  async all (params) {
    const response = await axios.get('connections', params)

    return response.data
  },

  async create (params) {
    const response = await axios.post('connections', params)

    return response.data.data
  },

  async destroy (id) {
    await axios.delete('connections/' + id)
  },

  async update (id, params) {
    const response = await axios.put('connections/' + id, params)

    return response.data.data
  }
}
