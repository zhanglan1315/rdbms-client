<template>
  <div
    v-if="isInitialized"
    class="full-container is-flex is-flex-column"
    style="height: 100vh; width: 100vw"
  >
    <Topbar />

    <Notification ref="notification"/>

    <div
      v-if="!isNetworkError"
      class="is-flex-auto"
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

  components: {
    Topbar,
    Notification
  },

  computed: {
    isInitialized () {
      return this.$store.state.token.isLoaded
    },

    isNetworkError () {
      return this.$store.state.error.network
    }
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
