<template>
  <div
    v-if="!isLoading"
    style="width: 100%; height: 100%; padding: 0.75rem"
  >
    <div class="table-container">
      <table class="table is-fullwidth is-bordered">
        <thead>
          <tr>
            <th v-for="column in dataSource.columns" :key="column.name">
              {{column.type}}
            </th>
          </tr>
          <tr>
            <th v-for="column in dataSource.columns" :key="column.name">
              <span>{{column.name}}</span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(datum, key) in dataSource.data" :key="key">
            <td v-for="(value, key) in datum" :key="key">
              {{value}}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <div v-else>
    <div class="loading"></div>
  </div>
</template>

<script>
import pg from '@/api/postgres'

export default {
  name: 'PostgresTable',

  props: {
    table: String,
    schema: String,
    database: String,
    connectionId: {}
  },

  data () {
    return {
      sql: '',
      dataSource: {
        data: [],
        columns: []
      },
      isLoading: false
    }
  },

  computed: {
    isChanged () {
      return this.connectionId + this.database + this.schema + this.table
    }
  },

  methods: {
    async handleInitialize () {
      this.sql = `select * from "${this.table}" limit 100`
      this.isLoading = true

      try {
        this.dataSource = await pg.select(this.database, this.schema, this.sql)
      } finally {
        this.isLoading = this.loading = false
      }
    }
  },

  watch: {
    isChanged: {
      immediate: true,
      handler () {
        if (
          this.table === undefined ||
          this.schema === undefined ||
          this.database === undefined ||
          this.connectionId === undefined
        ) {
          return
        }

        console.log(
          this.table,
          this.schema,
          this.database,
          this.connectionId
        )

        this.handleInitialize()
      }
    }
  }
}
</script>
