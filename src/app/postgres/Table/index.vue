<template>
  <div class="full-container is-flex is-flex-column">
    <div class="tabs is-marginless">
      <ul>
        <li class="is-active">
          <a>数据管理</a>
        </li>
      </ul>
    </div>

    <div class="is-flex-auto" style="padding: 0.5rem">
      <div class="table-container">
        <TableView
          v-if="!isLoading"
          :data="dataSource.data"
          :columns="dataSource.columns"
        ></TableView>
      </div>
    </div>

    <div
      class="is-flex"
      style="padding: 0 0.5rem 0.5rem 0.5rem; align-items: center;"
    >
      <Pagination
        :page="dataSource.page"
        :total="dataSource.total"
        :perPage="dataSource.perPage"
        @change-page="handleChangePage"
      />

      <span style="margin-left: 0.5rem">
        {{dataSource.time}}ms
      </span>

      <div class="is-flex-auto"></div>

      <span>
        {{ dataSource.data.length }} / {{dataSource.total}}
      </span>

    </div>
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
    },

    table () {
      return this.$route.query.table
    },

    schema () {
      return this.$route.query.schema
    },

    database () {
      return this.$route.query.database
    },

    connectionId () {
      return this.$route.params.connectionId
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
      this.page = 1
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
