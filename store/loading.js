export const state = () => ({
  // 请求数
  count: 0,
  // 最后一次点击的 button 或 a
  // 为了判断请求是由点击哪个标签发起的
  target: null,
})

const debounceIncrement = _.debounce((state) => {
  state.count++
}, 1000, { leading: true, trailing: false })

export const mutations = {
  debounceIncrement,
  decrement(state) {
    state.count == 0 ? 0 : state.count--
  },
  reset(state) {
    state.count = 0
    state.target = null
  },
  setTarget(state, payload) {
    state.target = payload.target;
  }
}
