<template>
  <div
    v-if="!isLoading"
    style="width: 100%; height: 100%; display: flex"
  >
    <div
      class="menu-container is-unselectable"
      style="width: 260px"
    >
      <div class="menu-list">
        <DatabaseMenu
          v-for="database in databases" :key="database"
          :database="database"
        />
      </div>
    </div>
    <div style="flex: 2; height: 100%; overflow: auto">
      <router-view/>
    </div>
  </div>
  <div v-else>
    <div class="loading"></div>
  </div>
</template>

<script>
import Dependencies from '@/core/runtime'

import pg from '@/api/postgres'
import DatabaseMenu from './DatabaseMenu'

export default {
  name: 'Postgres',

  components: {
    DatabaseMenu
  },

  props: {
    connectionId: {},
  },

  data () {
    return {
      isLoading: false,

      databases: [],
      database: null
    }
  },

  methods: {
    async getDatabases () {
      this.databases = await pg.databases()
    }
  },

  watch: {
    connectionId: {
      immediate: true,
      async handler () {
        this.isLoading = true
        pg.setConnectionId(this.connectionId)

        try {
          await this.getDatabases()
        } catch (e) {
          this.$router.push({
            name: 'connections'
          })

          Dependencies.notification.error('数据库连接失败')
        } finally {
          this.isLoading = false
        }
      }
    }
  }
}
</script>
