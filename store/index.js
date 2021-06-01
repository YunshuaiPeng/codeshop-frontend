export const actions = {
  async nuxtServerInit({ dispatch }) {
    if (!this.$auth.loggedIn) return
    await dispatch('cart/fetch')
  }
}
