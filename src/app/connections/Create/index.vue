<template>
  <div class="modal is-active">
    <div
      class="modal-background"
      @click="handleClose"
    ></div>
    <div class="modal-card" style="width: 600px">
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
        >
          取消
        </button>

        <button
          class="button is-info"
          @click="$wait(() => handleSubmit())"
        >
          创建
        </button>
      </footer>
    </div>
  </div>
</template>

<script>
import Dependencies from '@/core/runtime'
import ConnectionApi from '@/api/connection'
import ConnectionTest from '../common/ConnectionTest'

export default {
  name: 'ConnectionCreate',

  components: {
    ConnectionTest
  },

  props: {
    total: Number,
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

  methods: {
    handleClose () {
      this.$router.push({
        name: 'connections'
      })
    },

    async handleSubmit () {
      const item = await ConnectionApi.create(this.params)

      this.$emit('created', item)
      this.handleClose()
      Dependencies.notification.success('数据库连接已创建')
    },

    autoCompletePostgres () {
      this.params.port = 5432
      this.params.username = 'postgres'
      this.params.database = 'postgres'
    }
  },

  watch: {
    'params.driver' (driver) {
      switch (driver) {
        case 'pgsql':
          this.autoCompletePostgres()
      }
    }
  },

  created () {
    this.params.driver = 'pgsql'
    this.params.name = 'Database ' + (this.total + 1)
  }
}
</script>
