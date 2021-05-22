export const state = () => ({
  // 请求数
  count: 0,
  // 最后一次点击的元素，通常是 button
  // 为了判断请求是由点击哪个标签发起的
  target: null,
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
    state.target = null
  },
  setTarget(state, payload) {
    state.target = payload.target;
  }
}
