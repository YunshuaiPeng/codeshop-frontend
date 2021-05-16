<template>
  <header class="h-16 flex items-center justify-between">
    <div class="flex items-center justify-between space-x-4">
      <Logo class="text-indigo-700" />
      <div>
        <h1 class="text-lg font-semibold">CodeShop</h1>
      </div>
    </div>
    <div v-if="auth.loggedIn" class="flex items-center justify-between space-x-6">
      <div>
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      </div>
      <user-dropdown />
    </div>
    <div v-else class="flex items-center justify-between space-x-4">
      <nuxt-link to="/login"
        class="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
        登录</nuxt-link>
      <nuxt-link to="/"
        class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
        注册</nuxt-link>
    </div>
  </header>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    computed: {
      ...mapState(['auth']),
    },
  }
</script>
