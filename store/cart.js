export const state = () => ({
  cart: null,
})

export const getters = {
  checkedItems(state) {
    return state.cart.items.filter(item => item.checked)
  },

  checkedCount(state, getters) {
    return getters.checkedItems.length
  },

  totalAmount(state, getters) {
    let totalAmount = getters.checkedItems.reduce((carry, item) => carry + item.product.price, 0).toFixed(2)
    return Number(totalAmount)
  },

  allChecked(state, getters) {
    return getters.checkedItems.length == state.cart.items.length
  }
}

export const mutations = {
  set(state, cart) {
    state.cart = cart
  },

  toggleChecked(state, payload) {
    const item = state.cart.items.find(item => {
      return item.id == payload.itemId
    })

    this._vm.$set(item, 'checked', !item.checked)
  },

  toggleAllChecked(state) {
    const wholeChecked = state.cart.items.every(item => item.checked)
    for (const item of state.cart.items) {
      this._vm.$set(item, 'checked', !wholeChecked)
    }
  },

  deleteItem(state, payload) {
    const index = state.cart.items.findIndex(item => item.id == payload.itemId)
    this._vm.$delete(state.cart.items, index)
  }
}

export const actions = {
  async fetch({ commit }) {
    const cart = await this.$axios.$get('/api/cart')
    commit('set', cart)
  },

  async add({ commit }, payload) {
    const cart = await this.$axios.$post('/api/cart-items', {
      product_ids: payload.productIds
    })
    commit('set', cart)
    this.$toast.success('商品已加入购物车')
  },

  async deleteItem({ commit }, payload) {
    await this.$axios.delete('/api/cart-items/' + payload.itemId)
    commit('deleteItem', payload)
  },

  async deleteItemLocally({ commit }, payload) {
    commit('deleteItem', payload)
  },

  // async createOrder({ commit, getters }) {
  //   const payload = {
  //     'cart_items': getters.checkedItems.map(item => item.id),
  //     'amount': getters.totalAmount
  //   }

  //   const order = await this.$axios.$post('/api/orders', payload)

  //   for (const item of getters.checkedItems) {
  //     commit('deleteItem', { itemId: item.id })
  //   }

  //   console.log(order)
  // },
}
