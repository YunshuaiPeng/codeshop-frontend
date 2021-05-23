<template>
  <div class="max-w-md mx-auto mt-8 sm:mt-16">
    <h2 class="my-6 text-3xl font-extrabold text-gray-900">
      重置密码
    </h2>
    <form class="space-y-6" @submit.prevent="reset">
      <div>
        <label for="email" class="block text-sm font-medium">
          邮箱
        </label>
        <div class="mt-1">
          <input v-model="email" id="email" name="email" type="email" autocomplete="email" required=""
            disabled="disabled"
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
        <label for="password_confirmation" class="block text-sm font-medium text-gray-700">
          确认密码
        </label>
        <div class="mt-1">
          <input v-model="password_confirmation" id="password_confirmation" name="password_confirmation" type="password"
            required=""
            class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
        </div>
      </div>

      <Loading>
        <button type="submit"
          class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
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
        email: this.$route.query.email,
        password: null,
        password_confirmation: null,
        token: this.$route.query.token,
      }
    },

    methods: {
      async reset() {
        await this.$axios.post('/password/reset', {
          email: this.email,
          password: this.password,
          password_confirmation: this.password_confirmation,
          token: this.token,
        })
        this.$toast.success('密码重置成功')
        await this.$auth.loginWith('laravelSanctum', {
          data: {
            email: this.email,
            password: this.password,
          },
        })
        this.$router.push('/account/profile')
      }
    },
  }
</script>
