<template>
  <div style="display: flex; flex-flow: column; height: 100vh">
    <Topbar />
    <Notification ref="notification"/>
    <div style="flex: 2; overflow: auto;">
      <router-view />
    </div>
  </div>
</template>

<script>
import dependencies from '@/core/runtime'

import Topbar from './layout/Topbar'
import Notification from './layout/Notification'

export default {
  name: 'App',

  components: {
    Topbar,
    Notification
  },

  mounted () {
    dependencies.notification = this.$refs.notification
  }
}
</script>

<style lang="sass">
@import '@/assets/index.sass'
</style>
