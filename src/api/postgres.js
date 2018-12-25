import axios from '@/packages/axios'

export default {
  test (params) {
    return axios.post('postgres/test', params)
  },

  databases (params) {
    return axios.post('postgres/databases', params)
  },

  schemas (params) {
    return axios.post('postgres/schemas', params)
  },

  tables (params) {
    return axios.post('postgres/tables', params)
  },

  tableSearch (params) {
    return axios.post('postgres/table/search', params)
  },

  tableUpdate (params) {
    return axios.post('postgres/table/update', params)
  }
}
