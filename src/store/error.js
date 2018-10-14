export default {
  namespaced: true,

  state: {
    network: false
  },

  mutations: {
    setNetwork (state, value) {
      state.network = value
    }
  }
}
