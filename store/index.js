export const actions = {
  async nuxtServerInit({ dispatch }) {
    console.log(this.$auth)
    if (!this.$auth.loggedIn) return
    await dispatch('cart/fetch')
  }
}
