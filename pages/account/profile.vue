<template>
  <form @submit.prevent="update">
    <div class="border border-gray-300 sm:rounded-md sm:overflow-hidden">
      <div class="bg-white py-6 px-4 space-y-6 sm:p-6">
        <div class="grid grid-cols-3 gap-6">
          <div class="col-span-3 sm:col-span-2">
            <label for="name" class="block text-sm font-medium text-gray-700">
              昵称
            </label>
            <div class="mt-1">
              <input v-model="user.name" id="name" name="name" type="text"
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>
          </div>
          <div class="col-span-3 sm:col-span-2">
            <label for="email" class="block text-sm font-medium text-gray-700">
              <span>邮箱</span>
              <span v-if="auth.user.email_verified_at" class="text-green-600 text-xs">已验证</span>
            </label>
            <div class="mt-1">
              <input v-model="user.email" id="email" name="email" type="email"
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>
          </div>
        </div>
      </div>
      <div class="px-4 py-3 bg-gray-100 sm:px-6">
        <Loading class="w-16">
          <button type="submit"
            class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            保存
          </button>
        </Loading>
      </div>
    </div>
  </form>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    data() {
      return {
        user: _.cloneDeep(this.$auth.user),
      }
    },

    computed: {
      ...mapState(['auth'])
    },

    methods: {
      async update() {
        const { data } = await this.$axios.put('/api/user', {
          name: this.user.name,
          email: this.user.email,
        })

        this.$auth.setUser(data)

        this.$toast.success("保存成功");

        if (!this.$auth.user.email_verified_at) {
          this.$router.push('/email/resend')
        }
      }
    }
  }
</script>
