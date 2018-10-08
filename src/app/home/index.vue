<template>
  <div style="display: flex; flex-flow: column; height: 100vh">
    <Topbar />
    <Notifications ref="notifications"/>
    <div style="flex: 2; overflow: auto;">
      <router-view
        :notifications="$refs.notifications"
      />
    </div>
  </div>
</template>

<script>
import Topbar from './Topbar'
import tokenManager from './tokenManager'
import Notifications from '@/components/notifications'

export default {
  mixins: [tokenManager],

  components: {
    Topbar,
    Notifications
  },

  data () {
    return {
      token: {},
    }
  }
}
</script>
