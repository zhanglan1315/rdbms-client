<template>
  <section class="section">
    <div class="container" style="width: 500px">
      <div class="field">
        <label class="label">用户名</label>
        <div class="control">
          <input v-model="params.username" class="input" type="text">
        </div>
      </div>

      <div class="field">
        <label class="label">邮箱</label>
        <div class="control">
          <input v-model="params.email" class="input" type="email">
        </div>
      </div>

      <div class="field">
        <label class="label">密码</label>
        <div class="control">
          <input v-model="params.password" type="password" class="input">
        </div>
      </div>

      <div class="field">
        <div class="control">
          <button
            @click="handleSubmit"
            class="button is-link"
            :class="{ 'is-loading': isLoading }"
          >提交</button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import storage from 'store'
import auth from '@/api/auth'

export default {
  data () {
    return {
      params: {
        email: '',
        username: '',
        password: '',
      },

      isLoading: false
    }
  },

  methods: {
    async handleSubmit () {
      this.isLoading = true

      try {
        await auth.register(this.params)

        const { data: token } = await auth.login(
          this.params.username,
          this.params.password
        )

        storage.set('token', token)
        this.$store.commit('token/setToken', token)
        this.$store.commit('token/setIsVerified', true)
        this.$router.push('/')
      } finally {
        this.isLoading = false
      }
    }
  }
}
</script>
