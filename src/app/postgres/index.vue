<template>
  <div class="full-container is-flex is-flex-column">
    <Notifications ref="notifications"/>
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
            :database="database"
            :params="params"
            @change="handleDatabaseChange"
          />

          <div style="width: 0.25rem"></div>

          <Schema
            :schema="schema"
            :database="database"
            :params="params"
            @change="handleSchemaChange"
          />
        </div>

        <div
          v-if="isLoading"
          class="button is-fullwidth is-loading is-large is-text"
        ></div>

        <div v-else class="menu-list">
          <div style="text-align: center; width: 100%; margin-top: 1rem" v-if="noTables">
            无数据表
          </div>
          <TableMenu
            v-for="table in tables" :key="table"
            :table="table"
            :schema="schema"
            :database="database"
          />
        </div>
      </div>
      <div class="is-flex-auto">
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script>
import pg from '@/api/postgres'
import Schema from './menus/Schema'
import Database from './menus/Database'
import TableMenu from './menus/TableMenu'
import Notifications from '@/components/Notification'

export default {
  name: 'Postgres',

  components: {
    Schema,
    Database,
    TableMenu,
    Notifications
  },

  props: {
    connectionId: {},
  },

  data () {
    return {
      tables: [],
      databases: [],
      isLoading: false,
    }
  },

  computed: {
    schema () {
      return this.$route.query.schema
    },

    database () {
      return this.$route.query.database
    },

    key () {
      return this.connection + this.database + this.schema
    },

    params () {
      return {
        schema: this.schema,
        database: this.database,
        connectionId: this.connectionId
      }
    },

    notifications () {
      return this.$refs.notifications
    },

    noTables () {
      return !this.isLoading && this.tables.length === 0
    }
  },

  methods: {
    handleSchemaChange (schema) {
      this.$router.push({
        name: 'postgres',
        params: {
          connectionId: this.connectionId
        },
        query: {
          schema,
          database: this.database,
        }
      })
    },

    handleDatabaseChange (database) {
      this.$router.push({
        name: 'postgres',
        params: {
          connectionId: this.connectionId
        },
        query: {
          database,
          schema: 'public',
        }
      })
    }
  },

  watch: {
    key: {
      immediate: true,
      async handler () {
        this.isLoading = true

        pg.tables(this.params)
          .then(response => this.tables = response.data)
          .catch(() => this.notifications.error('数据库连接失败'))
          .finally(() => this.isLoading = false)
      }
    }
  }
}
</script>
