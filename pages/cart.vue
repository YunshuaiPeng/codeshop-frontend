<template>
  <div class="lg:px-24 lg:py-6 xl:px-48">
    <div class="bg-white">
      <div class="px-4 py-5 sm:px-6 border border-gray-200 rounded-t-lg">
        <h3 class="text-lg leading-6 font-medium text-gray-900">
          购物车
        </h3>
      </div>
    </div>

    <div class="border-l border-r border-gray-200 py-6 space-y-6">
      <div v-if="!cart.items.length" class="h-24 lg:h-32 flex justify-center items-center">
        <span class="text-gray-500">没有商品，</span>
        <NuxtLink to="/" class="hover:text-blue-500">去选购</NuxtLink>
      </div>
      <div v-if="cart.items.length" v-for="(item, index) in cart.items" class="grid grid-cols-6 h-24 lg:h-32">
        <label class="block col-span-1 flex justify-center items-center cursor-pointer">
          <input type="checkbox" class="text-blue-500 h-6 w-6 rounded-full cursor-pointer" :checked="item.checked"
            @change="toggleChecked(item.id)">
        </label>

        <NuxtLink :to="/products/+item.product.id" class="col-span-4 flex space-x-3 lg:space-x-6">
          <div
            class="flex justify-center items-center h-full border border-gray-200 rounded-lg overflow-hidden w-32 lg:w-36 lg:w-56">
            <img :src="item.product.preview.desktop[0]" alt="item.product.name">
          </div>

          <div class="flex flex-col justify-around">
            <h3 class="leading-6 font-medium text-gray-900 text-sm lg:text-base">
              {{ item.product.name }}
            </h3>
            <div class="text-md lg:text-lg text-red-700 font-medium">
              <span class="text-xs">¥</span> {{ item.product.price }}
            </div>

          </div>
        </NuxtLink>
        <div class="col-span-1 flex justify-center items-center">
          <button @click="deleteItem(item.id)" class="text-gray-400 focus:outline-none hover:text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <div class="bg-white sticky bottom-0 z-10">
      <div class="py-5 border border-gray-200 rounded-b-lg">
        <div class="grid grid-cols-6">
          <label class="block col-span-1 flex items-center justify-center cursor-pointer">
            <input type="checkbox" class="text-blue-500 h-6 w-6 rounded-full cursor-pointer" :checked="allChecked"
              @change="toggleAllChecked">
          </label>
          <div class="col-span-4 flex items-center justify-between">
            <div class="flex flex-col lg:flex-row items-baseline space-x-0 lg:space-x-1">
              <div>
                <span>已选</span>
                <span class="text-lg text-red-700"> {{ checkedCount }} </span>
                <span>件商品</span>
              </div>
              <div class="text-xs text-gray-500">
                (共计 {{ cart.items.length }} 件商品)
              </div>
            </div>
            <div class="px-6">
              <span class="text-xs text-gray-500">合计：</span>
              <span class="text-xs text-red-700 font-medium">¥</span>
              <span class="text-md lg:text-lg text-red-700 font-medium">{{ totalAmount }}</span>
            </div>
          </div>
          <div class="col-span-1 flex items-center justify-center">
            <button @click="checkout"
              class="w-24 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400">
              提交订单
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState, mapGetters } from 'vuex'

  export default {
    computed: {
      ...mapState('cart', ['cart']),

      ...mapGetters('cart', ['checkedCount', 'totalAmount', 'allChecked', 'checkedItems']),
    },

    methods: {
      toggleChecked(itemId) {
        this.$store.commit('cart/toggleChecked', { itemId })
      },
      toggleAllChecked() {
        this.$store.commit('cart/toggleAllChecked')
      },
      deleteItem(itemId) {
        this.$store.dispatch('cart/deleteItem', { itemId })
      },
      deleteItemLocally(itemId) {
        this.$store.dispatch('cart/deleteItemLocally', { itemId })
      },
      async checkout() {
        const payload = {
          'cart_items': this.checkedItems.map(item => item.id),
          'amount': this.totalAmount
        }

        const order = await this.$axios.$post('/api/orders', payload)

        this.$router.push('/mock-payments/' + order.payment.identifier)

        for (const item of this.checkedItems) {
          this.deleteItemLocally(item.id)
        }

      }
    }
  }
</script>
</script>
</script>
</script>
