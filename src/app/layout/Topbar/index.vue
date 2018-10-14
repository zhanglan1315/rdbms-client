<template>
  <nav class="app-topbar is-mobile level is-marginless">
    <div class="level-left">
      <div
        class="title"
        @click="$router.push('/')"
        style="cursor: pointer"
      >
        RDBMS
      </div>
    </div>

    <div class="level-right">
      <template v-if="!isVerified">
        <p class="level-item">
          <a @click="$router.push({name: 'register'})">注册</a>
        </p>
        <p class="level-item">
          <a @click="$router.push({name: 'login'})">登陆</a>
        </p>
      </template>

      <p
        class="level-item"
        v-if="isVerified"
      >
        <a @click="handleLogout">注销</a>
      </p>
    </div>
  </nav>
</template>

<script>
import storage from 'store'

export default {
  name: 'AppTopbar',

  computed: {
    isVerified () {
      return this.$store.state.token.isVerified
    }
  },

  methods: {
    handleLogout () {
      storage.remove('token')
      this.$store.commit('token/removeToken')
      this.$router.push('/login')
    }
  }
}
</script>
