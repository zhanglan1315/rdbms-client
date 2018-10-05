<template>
  <div>
    homepage
    <router-view/>
  </div>
</template>

<script>
import tokenManager from './tokenManager'

export default {
  mixins: [tokenManager],

  data () {
    return {
      token: {}
    }
  },

  methods: {

  }
}
</script>
