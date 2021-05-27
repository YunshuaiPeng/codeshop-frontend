<template>
  <header class="h-16 flex items-center justify-between">
    <NuxtLink to="/" class="block flex items-center justify-between space-x-4">
      <Logo class="w-8 h-8 text-blue-600" />
      <h1 class="text-sm sm:text-lg font-semibold">CodeShop</h1>
    </NuxtLink>
    <div v-if="auth.loggedIn" class="flex items-center justify-between space-x-6">
      <Cart />
      <Avatar />
    </div>
    <div v-else class="flex items-center justify-between space-x-4">
      <NuxtLink to="/login"
        class="inline-flex items-center px-2 py-1 sm:px-4 sm:py-2 border border-transparent text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400">
        登录</NuxtLink>
      <NuxtLink to="/register"
        class="inline-flex items-center px-2 py-1 sm:px-4 sm:py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400">
        注册</NuxtLink>
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
