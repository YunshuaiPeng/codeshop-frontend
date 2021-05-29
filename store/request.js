export const state = () => ({
  // 请求数
  count: 0,
})

export const mutations = {
  increment(state) {
    state.count++
  },
  decrement(state) {
    state.count--
  },
  reset(state) {
    state.count = 0
  },
}
