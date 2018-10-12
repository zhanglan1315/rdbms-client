<template>
  <div style="display: flex; flex-flow: column; height: 100vh">
    <div style="flex: 2; overflow: auto;">
      <keep-alive>
        <router-view />
      </keep-alive>
    </div>
  </div>
</template>

<script>
import tokenManager from './tokenManager'

export default {
  name: 'Home',

  mixins: [tokenManager]
}
</script>
