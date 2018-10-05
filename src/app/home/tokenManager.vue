<script>
import store from 'store'
import { now } from 'lodash'

import auth from '@/api/auth'
import axios from '@/core/axios'

/**
 * 1. get token from localstorage
 * 2. check validity of token
 * 3. refresh token if necessary when entering route
 */

export default {
  data () {
    return {
      token: {}
    }
  },

  methods: {
    getToken () {
      this.token = store.get('token')

      if (
        typeof this.token !== 'object' ||
        typeof this.token.token !== 'string' ||
        typeof this.token.refresh_at !== 'number' ||
        typeof this.token.expired_at !== 'number'
      ) {
        this.$router.push('/login')
      } else {
        this.setTokenOnAxios()
      }
    },

    async checkToken () {
      const current = now() / 1000

      if (this.token.expired_at < current) {
        this.redirectToLoginPage()
      }

      try {
        await auth.check()
        const current = now()

        if (this.token.refresh_at < current) {
          this.refreshToken()
        }
      } catch (e) {
        this.redirectToLoginPage()
      }
    },

    setRouterInterceptor () {
      this.$router.beforeEach((to, from, next) => {
        const current = now() / 1000

        if (this.token.refresh_at < current) {
          this.refreshToken()
        }

        next()
      })
    },

    // subfunc

    redirectToLoginPage () {
      store.remove('token')
      this.$router.push('/login')
    },

    async refreshToken () {
      this.token = await auth.refresh()

      this.setTokenOnAxios()
    },

    setTokenOnAxios () {
      axios.defaults.headers.common['Authorization'] = this.token.token
    }
  },

  async created () {
    this.getToken()
    await this.checkToken()
    this.setRouterInterceptor()
  }
}
</script>
