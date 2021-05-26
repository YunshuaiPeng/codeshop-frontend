<template>
  <div class="max-w-md mx-auto mt-8 sm:mt-16">
    <h2 class="my-6 text-3xl font-extrabold text-gray-900">
      登录
    </h2>
    <form class="space-y-6" @submit.prevent="login">
      <div>
        <label for="email" class="block text-sm font-medium">
          邮箱
        </label>
        <div class="mt-1">
          <input v-model="email" id="email" name="email" type="email" autocomplete="email" required=""
            class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-400 focus:border-blue-400 sm:text-sm" />
        </div>
      </div>

      <div>
        <label for="password" class="block text-sm font-medium text-gray-700">
          密码
        </label>
        <div class="mt-1">
          <input v-model="password" id="password" name="password" type="password" autocomplete="current-password"
            required=""
            class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-400 focus:border-blue-400 sm:text-sm" />
        </div>
      </div>

      <div class="flex items-center justify-between">
        <div class="flex items-center">
          <input v-model="remember_me" id="remember_me" name="remember_me" type="checkbox"
            class="h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300 rounded">
          <label for="remember_me" class="ml-2 block text-sm text-gray-900">
            记住我
          </label>
        </div>

        <div class="text-sm">
          <NuxtLink to="/password/forgot" class="font-medium text-blue-500">
            忘记密码？
          </NuxtLink>
        </div>
      </div>

      <Loading>
        <button type="submit"
          class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400">
          确认
        </button>
      </Loading>
    </form>
  </div>
</template>

<script>
  export default {
    auth: 'guest',

    data() {
      return {
        email: 'admin@admin.com',
        password: '123456789',
        remember_me: false,
        errors: null,
      }
    },

    methods: {
      async login() {
        await this.$auth.loginWith('laravelSanctum', {
          data: {
            email: this.email,
            password: this.password,
            remember_me: this.remember_me,
          },
        })
      }
    },
  }
</script>
