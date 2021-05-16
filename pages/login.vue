<template>
  <div class="max-w-md mx-auto mt-24">
    <form class="space-y-6" @submit.prevent="login">
      <div>
        <label for="email" class="block text-sm font-medium">
          邮箱
        </label>
        <div class="mt-1">
          <input v-model="email" id="email" name="email" type="email" autocomplete="email" required=""
            class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
        </div>
      </div>

      <div>
        <label for="password" class="block text-sm font-medium text-gray-700">
          密码
        </label>
        <div class="mt-1">
          <input v-model="password" id="password" name="password" type="password" autocomplete="current-password"
            required=""
            class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
        </div>
      </div>

      <div>
        <button type="submit"
          class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          登录
        </button>
      </div>

      <div class="mt-4 text-red-500">
        <div v-for="(item, i) in errors" :key="i">
          <div v-for="(error, j) in item" :key="j">
            {{ error }}
          </div>
        </div>
      </div>
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
        errors: null
      }
    },

    methods: {
      async login() {
        try {
          const response = await this.$auth.loginWith('laravelSanctum', {
            data: {
              email: this.email,
              password: this.password,
            },
          })
          this.$router.push('/')
        } catch (err) {
          console.log(err)
          this.errors = err.response.data.errors
        }
      }
    },
  }
</script>
