<template>
  <div class="full-container is-flex is-flex-column">
    <div class="full-container is-flex">
      <div
        class="menu-container is-unselectable"
        style="min-width: 230px; height: 100%;"
      >
        <div
          class="is-flex has-border-bottom"
          style="padding: 0.25rem"
        >
          <Database
            :params="apiParams"
            @change="handleDatabaseChange"
          />

          <div style="width: 0.25rem"></div>

          <Schema
            :schema="schema"
            :params="apiParams"
            @change="handleSchemaChange"
          />

          <a
            class="button is-white"
            :disabled="isLoading"
            @click="handleRefreshClick"
          >
            <span class="icon">
              <i class="iconfont icon-refresh"></i>
            </span>
          </a>
        </div>

        <div
          v-if="isLoading"
          class="button is-fullwidth is-loading is-large is-text"
        ></div>

        <div v-else class="menu-list">
          <div
            v-if="noTables"
            style="text-align: center; width: 100%; margin-top: 1rem"
          >
            无数据表
          </div>
          <TableMenu
            v-for="table in tables" :key="table"
            :table="table"
            :schema="schema"
            :database="database"
            @click="handleTableClick"
          />
        </div>
      </div>
      <Tabs
        :parentRoute="routeParams"
        include="PostgresTableWrapper"
      />
      <!-- <div class="is-flex-auto">
        <router-view :key="$route.fullPath"/>
      </div> -->
    </div>
  </div>
</template>

<script>
import pg from '@/api/postgres'

import Tabs from './tabs'
import Schema from './menus/Schema'
import Database from './menus/Database'
import TableMenu from './menus/TableMenu'
export default {
  name: 'Postgres',

  components: {
    Tabs,
    Schema,
    Database,
    TableMenu
  },

  props: {
    connectionId: {},
  },

  data () {
    return {
      tables: [],
      isLoading: false,
    }
  },

  computed: {
    table () {
      return this.$route.query.table
    },

    schema () {
      return this.$route.query.schema
    },

    database () {
      return this.$route.query.database
    },

    key () {
      return this.connection + this.database + this.schema
    },

    apiParams () {
      return {
        schema: this.schema,
        database: this.database,
        connectionId: this.connectionId
      }
    },

    routeParams () {
      return {
        name: 'postgres',
        params: {
          connectionId: this.connectionId
        },
        query: {
          schema: this.schema,
          database: this.database,
        }
      }
    },

    noTables () {
      return !this.isLoading && this.tables.length === 0
    }
  },

  methods: {
    handleSchemaChange (schema) {
      this.routeParams.query.schema = schema
      this.$router.push(this.routeParams)
    },

    handleDatabaseChange (database) {
      this.routeParams.query.database = database
      this.$router.push(this.routeParams)
    },

    handleTableClick (table) {
      this.routeParams.name = 'postgres table'
      this.routeParams.query.table = table
      this.$router.push(this.routeParams)
    },

    handleRefreshClick () {
      this.getTables()
    },

    getTables () {
      if (this.isLoading) return

      const handleError = () => {
        this.$notification.error('数据库连接失败')
        this.$router.push({ name: 'connections' })
      }

      this.isLoading = true
      pg.tables(this.apiParams)
        .then(response => this.tables = response.data)
        .catch(handleError)
        .finally(() => this.isLoading = false)
    }
  },

  watch: {
    key: {
      immediate: true,
      handler () {
        this.getTables()
        if (this.table) {
          this.handleTableClick(this.table)
        }
      }
    }
  }
}
</script>
