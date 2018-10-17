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
  },

  async databases () {
    const response = await axios.post('postgres/databases', {
      connectionId
    })

    return response.data
  },

  async schemas (database) {
    const response = await axios.post('postgres/schemas', {
      database,
      connectionId
    })

    return response.data
  },

  async tables (database, schema) {
    const response = await axios.post('postgres/tables', {
      schema,
      database,
      connectionId
    })

    return response.data
  },

  async select (database, schema, sql) {
    const response = await axios.post('postgres/select', {
      sql,
      schema,
      database,
      connectionId
    })

    return response.data
  },

  async tableSearch (params) {
    const response = await axios.post('postgres/table/search', {
      connectionId,
      ...params
    })

    return response.data
  },

  tableUpdate (params) {
    return axios.post('postgres/table/update', {
      connectionId,
      ...params
    })
  }
}
