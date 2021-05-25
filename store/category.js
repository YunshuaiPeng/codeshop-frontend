export const state = () => ({
  categories: null
})

export const mutations = {
  set(state, categories) {
    console.log(categories)
    state.categories = categories
  },
}

export const actions = {
  async fetch({ commit, state }) {
    if (state.categories != null) return
    const categories = await this.$axios.$get('/api/categories')
    commit('set', categories)
  },
}
