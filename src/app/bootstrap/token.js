import storage from 'store'
import { now } from 'lodash'
import auth from '@/api/auth'

export default {
  async created () {
    const current = now() / 1000
    let token = storage.get('token')

    if (
      typeof token !== 'object' ||
      typeof token.token !== 'string' ||
      typeof token.refresh_at !== 'number' ||
      typeof token.expired_at !== 'number'
    ) {
      // token is not found
      storage.remove('token')
    } else if (token.expired_at < current) {
      // token is expired
      storage.remove('token')
    } else {
      this.$store.commit('token/setToken', token)

      try {
        const response = await auth.check()

        if (response.data.token) {
          // refresh token
          token = response.data.token
        }

        this.$store.commit('token/setToken', token)
        this.$store.commit('token/setIsVerified', true)
      } catch (error) {
        if (error.response && error.response.status === 403) {
          this.$router.push('/login')
        }
      }
    }

    this.$store.commit('token/setIsLoaded', true)
  }
}
