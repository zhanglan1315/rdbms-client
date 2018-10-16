<template>
  <div
    class="full-container is-flex"
  >
    <div
      class="menu-container is-unselectable"
      style="min-width: 230px; height: 100%;"
    >
      <div class="is-flex" style="padding: 0.25rem">
        <Database
          :database="database"
          @change="handleDatabaseChange"
        />

        <div style="width: 0.25rem"></div>

        <Schema
          :schema="schema"
          :database="database"
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
</template>

<script>
import runtime from '@/core/runtime'

import pg from '@/api/postgres'
import Schema from './menus/Schema'
import Database from './menus/Database'
import TableMenu from './menus/TableMenu'

export default {
  name: 'Postgres',

  components: {
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

    databaseSchema () {
      return this.database + this.schema
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
    connectionId: {
      immediate: true,
      handler () {
        pg.setConnectionId(this.connectionId)
      }
    },

    databaseSchema: {
      immediate: true,
      async handler () {
        this.isLoading = true

        try {
          this.tables = await pg.tables(this.database, this.schema)
        } catch (e) {
          runtime.notification.error('数据库连接失败')
          this.$router.go(-1)
        } finally {
          this.isLoading = false
        }
      }
    }
  }
}
</script>
