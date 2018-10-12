<template>
  <keep-alive>
    <router-view />
  </keep-alive>
</template>

<script>
import tokenManager from './tokenManager'

export default {
  name: 'Home',

  mixins: [tokenManager]
}
</script>
