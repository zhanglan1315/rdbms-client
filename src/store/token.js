export default {
  namespaced: true,

  state: {
    token: {
      token: '',
      expired_at: 0,
      refresh_at: 0
    },
    isLoaded: false,
    isVerified: false
  },

  mutations: {
    setToken (state, token) {
      state.token = token
    },

    setIsLoaded (state, value) {
      state.isLoaded = value
    },

    setIsVerified (state, value) {
      state.isVerified = value
    },

    removeToken (state) {
      state.token.token = ''
      state.isVerified = false
    }
  }
}
