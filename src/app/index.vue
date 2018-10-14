<template>
  <div
    v-if="isInitialized"
    style="display: flex; flex-flow: column; height: 100vh"
  >
    <Topbar />
    <Notification ref="notification"/>
    <div
      v-if="!isNetworkError"
      style="flex: 2; overflow: auto;"
    >
      <router-view />
    </div>
  </div>
  <div v-else>
    <div class="loading"></div>
  </div>
</template>

<script>
import dependencies from '@/core/runtime'

import Topbar from './layout/Topbar'
import Notification from './layout/Notification'
import token from './bootstrap/token'

export default {
  name: 'App',

  mixins: [token],

  computed: {
    isInitialized () {
      return this.$store.state.token.isLoaded
    },

    isNetworkError () {
      return this.$store.state.error.network
    }
  },

  components: {
    Topbar,
    Notification
  },

  mounted () {
    dependencies.notification = this.$refs.notification
  },

  updated () {
    dependencies.notification = this.$refs.notification
  }
}
</script>

<style lang="sass">
@import '@/assets/index.sass'
</style>
