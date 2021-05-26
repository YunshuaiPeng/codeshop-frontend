<template>
  <div class="max-w-md mx-auto mt-8 sm:mt-16">
    <h2 class="my-6 text-3xl font-extrabold text-gray-900">
      发送重置密码链接
    </h2>
    <form class="space-y-6" @submit.prevent="forgot">
      <div>
        <label for="email" class="block text-sm font-medium">
          邮箱
        </label>
        <div class="mt-1">
          <input v-model="email" id="email" name="email" type="email" autocomplete="email" required=""
            class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-400 focus:border-blue-400 sm:text-sm" />
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
        email: null,
      }
    },

    methods: {
      async forgot() {
        await this.$axios.get('/sanctum/csrf-cookie')
        await this.$axios.post('/password/forgot', {
          email: this.email,
        })
        this.$toast.success('发送成功')
      }
    },
  }
</script>
