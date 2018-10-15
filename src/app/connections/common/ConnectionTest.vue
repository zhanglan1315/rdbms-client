<template>
  <div style="display: flex; align-items: center">
    <span>

    </span>
    <a
      @click="handleTest"
      class="button is-success"
      style="margin-right: 1rem"
      :class="{ 'is-loading': isLoading }"
    >
      连接测试
    </a>

    <template v-if="isShowResult">
      <strong v-if="isConnectSuccess" class="has-text-success">
        连接成功
      </strong>
      <strong v-else class="has-text-danger">
        连接失败
      </strong>
    </template>
  </div>
</template>

<script>
import postgres from '@/api/postgres'
import { sleep } from '@/utils/async'

export default {
  name: 'ConnectionTest',

  props: {
    connection: Object
  },

  data () {
    return {
      isLoading: false,
      isShowResult: false,
      isConnectSuccess: false
    }
  },

  methods: {
    async handleTest () {
      try {
        this.isLoading = true

        switch (this.connection.driver) {
          case 'pgsql':
            await this.testPostgres()
        }

        this.isConnectSuccess = true
      } catch (e) {
        this.isConnectSuccess = false
      } finally {
        this.isLoading = false
        this.isShowResult = true
        await sleep(5000)
        this.isShowResult = false
      }
    },

    async testPostgres () {
      await postgres.test(this.connection)
    }
  }
}
</script>
