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
      <div class="postgres is-flex-auto is-flex is-flex-column">
        <!-- <div
          class="tabs is-boxed is-marginless"
          style="height: 45px"
        >
          <ul>
            <li
              v-for="tab in tabs" :key="tab.fullPath"
              class="is-flex"
              :class="{'is-active': tab.fullPath === $route.fullPath}"
            >
              <a @click="handleTabClick(tab)">
                <span
                  class="is-flex-auto"
                  style="padding-right: 0.75rem"
                >{{tab.name}}</span>
                <button
                  class="delete is-small"
                  style="margin-right: -0.25rem"
                  @click.stop="handleTabRemove(tab)"
                ></button>
              </a>
            </li>
          </ul>
        </div> -->
        <keep-alive include="PostgresTable" max="5">
          <router-view
            :tabs="tabs"
            :key="$route.fullPath"
            @created="handleTabCreate"
          />
        </keep-alive>
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
      tabs: [],
      tables: [],
      tabKey: '',
      databases: [],
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
    },

    handleTableClick (table) {
      const name = 'postgres table'
      const { schema, database, connectionId } = this
      const params = {
        name,
        query: {
          table,
          schema,
          database,
          connectionId
        }
      }

      this.$router.push(params)
    },

    handleTabRemove (tab) {
      const index = this.tabs.findIndex(tb => tb.fullPath === tab.fullPath)

      if (tab.fullPath !== this.$route.fullPath) {

      } if (this.tabs.length === 1) {
        this.$router.push(tab.fullPath)
      } else if (index > 0) {
        this.handleTabClick(this.tabs[index - 1])
      } else {
        this.handleTabClick(this.tabs[index + 1])
      }

      this.tabs.splice(index, 1)
    },

    handleTabClick (tab) {
      this.$router.push(tab.fullPath)
    },

    handleTabCreate (tab) {
      this.tabs.push(tab)
    },

    getTabByFullPath (fullPath) {
      return this.tabs.find(tab => tab.fullPath === fullPath)
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
  },

  created () {
    if (this.table) {
      this.handleTableClick(this.table)
    }
  }
}
</script>
