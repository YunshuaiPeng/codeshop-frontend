<template>
  <div>
    <nav class="flex mt-2 mb-6">
      <ol class="flex items-center space-x-4">
        <li>
          <div class="flex items-center">
            <NuxtLink :to="{ path: '/', query: { category_id: category.parent.id }}"
              class="text-sm font-medium text-gray-500 hover:text-gray-700">
              {{ category.parent.name }}
            </NuxtLink>
          </div>
        </li>

        <li>
          <div class="flex items-center">
            <svg class="flex-shrink-0 h-5 w-5 text-gray-300" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
              viewBox="0 0 20 20" aria-hidden="true">
              <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
            </svg>
            <div class="ml-4 text-sm font-medium text-gray-500">
              {{ category.name }}
            </div>
          </div>
        </li>
      </ol>
    </nav>

    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 md:grid-cols-3 md:gap-8">
      <div v-for="(product, index) in category.products"
        class="relative flex flex-col justify-between border border-gray-200 rounded-lg focus:outline-none">

        <NuxtLink :to="/products/+product.id" class="flex-grow rounded-t-lg overflow-hidden focus:outline-none">
          <img :src="product.preview.desktop[0]" alt="product.name" class="rounded-t-lg">
        </NuxtLink>

        <div class="p-6">
          <div class="flex justify-between items-center">
            <div>
              <h3 class="text-lg font-medium">
                <NuxtLink :to="/products/+product.id" class="focus:outline-none">
                  {{ product.name }}
                </NuxtLink>
              </h3>
              <div class="text-lg text-red-700 font-medium col-span-2">
                ¥ {{ product.price }}
              </div>
            </div>
            <button @click="addToCart(product)"
              class="hidden md:block w-24 h-8 flex justify-center py-1 px-3 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400">
              加入购物车
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    auth: false,

    async asyncData({ $axios, params }) {
      const { data } = await $axios.get('/api/categories/' + params.id)
      return { category: data }
    },

    methods: {
      addToCart(product) {
        this.$store.dispatch('cart/add', {
          productIds: [product.id]
        })
      }
    }
  }
</script>
