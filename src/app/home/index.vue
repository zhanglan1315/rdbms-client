<template>
  <div
    v-if="token.isVerified"
    class="full-container"
  >
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'Home',

  computed: {
    token () {
      return this.$store.state.token
    }
  },

  created () {
    if (!this.token.isVerified) {
      this.$router.push('/login')
    }
  }
}
</script>
