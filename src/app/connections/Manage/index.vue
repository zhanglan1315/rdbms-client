<template>
  <div class="modal is-active">
    <div
      class="modal-background"
      @click="handleClose"
    ></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">连接信息</p>
      </header>

      <section class="modal-card-body">
        <div class="field">
          <label class="label">连接名</label>
          <div class="control">
            <input v-model="params.name" class="input" type="text">
          </div>
        </div>

        <div class="field">
          <label class="label">数据库驱动</label>
          <div class="control">
            <div class="select">
              <select v-model="params.driver">
                <option value="pgsql">PostgreSQL</option>
              </select>
            </div>
          </div>
        </div>

        <div class="field">
          <label class="label">IP 地址</label>
          <div class="control">
            <input v-model="params.host" class="input" type="text">
          </div>
        </div>

        <div class="field">
          <label class="label">端口</label>
          <div class="control">
            <input v-model="params.port" class="input" type="number">
          </div>
        </div>

        <div class="field">
          <label class="label">用户名</label>
          <div class="control">
            <input v-model="params.username" class="input" type="text">
          </div>
        </div>

        <div class="field">
          <label class="label">密码</label>
          <div class="control">
            <input v-model="params.password" class="input" type="text">
          </div>
        </div>

        <div class="field">
          <label class="label">数据库</label>
          <div class="control">
            <input v-model="params.database" class="input" type="text">
          </div>
        </div>
      </section>

      <footer class="modal-card-foot" style="display: flex">
        <ConnectionTest :connection="params"/>

        <div style="flex: 2"></div>

        <button
          class="button"
          @click="handleClose"
        >取消</button>

        <button
          :disabled="!isChanged"
          class="button is-info"
          @click="isChanged && $wait(handleSubmit)"
        >
          保存
        </button>
      </footer>
    </div>
  </div>
</template>

<script>
import ConnectionApi from '@/api/connection'
import ConnectionTest from '../common/ConnectionTest'

export default {
  name: 'ConnectionManage',

  components: {
    ConnectionTest
  },

  props: {
    connection: {},
    connectionId: {},
    notifications: Object
  },

  data () {
    return {
      params: {
        name: '',
        driver: '',
        host: '',
        port: '',
        username: '',
        password: '',
        database: ''
      }
    }
  },

  computed: {
    isChanged () {
      for (let key in this.params) {
        if (this.params[key] !== this.connection[key]) {
          return true
        }
      }

      return false
    }
  },

  methods: {
    handleClose () {
      this.$router.push({
        name: 'connections'
      })
    },

    async handleSubmit () {
      const item = await ConnectionApi.update(this.connectionId, this.params)

      this.$emit('updated', item)

      this.handleClose()

      this.notifications.$success('数据库连接已保存')
    }
  },

  watch: {
    'connection': {
      immediate: true,

      handler (connection) {
        if (!connection) return

        for (let key in this.params) {
          this.params[key] = connection[key]
        }
      }
    }
  }
}
</script>
