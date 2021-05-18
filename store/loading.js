export const state = () => ({
  count: 0
})

export const mutations = {
  increment(state) {
    state.count++
  },
  decrement(state) {
    state.count == 0 ? 0 : state.count--
  }
}
