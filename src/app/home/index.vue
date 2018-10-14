<template>
  <div v-if="token.isVerified" style="height: 100%; width: 100%">
    <keep-alive>
      <router-view />
    </keep-alive>
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
