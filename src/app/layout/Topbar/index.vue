<template>
  <nav class="app-topbar level is-marginless">
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
