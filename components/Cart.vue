<template>
  <div class="relative">
    <NuxtLink to="/cart"
      class="bg-gray-100 rounded-full flex items-center focus:outline-none focus:ring-2 focus:ring-offset-gray-100 focus:ring-blue-400">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    </NuxtLink>
    <span v-if="cart"
      class="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white rounded-full border border-2 border-white text-xs inline-flex items-center justify-center p-1">
      {{ cart.items.length }}
    </span>
  </div>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    computed: {
      ...mapState('cart', ['cart']),
    },
  }
</script>
