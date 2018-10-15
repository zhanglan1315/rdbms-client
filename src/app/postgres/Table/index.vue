<template>
  <div
    v-if="!isLoading"
    class="full-container is-flex is-flex-column"
  >
    <div class="tabs is-marginless">
      <ul>
        <li class="is-active">
          <a>数据管理</a>
        </li>
      </ul>
    </div>

    <div class="is-flex-auto" style="padding: 0.5rem">
      <TableView :dataSource="dataSource"/>
    </div>

    <div style="padding: 0.5rem; padding-top: 0;">
      <Pagination
        v-bind="dataSource"
        @change-page="handleChangePage"
      />
    </div>
  </div>
  <div v-else>
    <div class="loading"></div>
  </div>
</template>

<script>
import pg from '@/api/postgres'
import TableView from './TableView'
import Pagination from './Pagination'

export default {
  name: 'PostgresTable',

  components: {
    TableView,
    Pagination
  },

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
      isLoading: false,

      page: 1,
    }
  },

  computed: {
    isChanged () {
      return this.connectionId + this.database + this.schema + this.table
    }
  },

  methods: {
    async search () {
      this.isLoading = true

      try {
        this.dataSource = await pg.table({
          page: this.page,
          table: this.table,
          schema: this.schema,
          database: this.database,
        })
      } finally {
        this.isLoading = false
      }
    },

    handleInitialize () {
      this.search()
    },

    handleChangePage (page) {
      this.page = page
      this.search()
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

        this.handleInitialize()
      }
    }
  }
}
</script>
