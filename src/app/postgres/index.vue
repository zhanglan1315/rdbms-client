<template>
  <div v-if="!isLoading">
    Postgres
  </div>
  <div v-else>
    <div class="loading"></div>
  </div>
</template>

<script>
import pg from '@/api/postgres'
import { sleep } from '@/utils/async'

export default {
  props: {
    connectionId: {},

    notifications: Object
  },

  data () {
    return {
      isLoading: false
    }
  },

  async activated () {
    try {
      pg.setConnectionId(this.connectionId)
      this.isLoading = true

      await sleep(1000)
      await pg.connect()
    } catch (e) {
      this.$router.push({
        name: 'connections'
      })

      this.notifications.$error('数据库连接失败')
    } finally {
      this.isLoading = false
    }
  }
}
</script>
