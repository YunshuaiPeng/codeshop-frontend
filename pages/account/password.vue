<template>
  <form @submit.prevent="update">
    <div class="border border-gray-300 sm:rounded-md sm:overflow-hidden">
      <div class="bg-white py-6 px-4 space-y-6 sm:p-6">
        <div class="grid grid-cols-3 gap-6">
          <div class="col-span-3 sm:col-span-2">
            <label for="current_password" class="block text-sm font-medium text-gray-700">
              当前密码
            </label>
            <div class="mt-1">
              <input v-model="current_password" id="current_password" name="current_password" type="password" required=""
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-400 focus:border-blue-400 sm:text-sm" />
            </div>
          </div>

          <div class="col-span-3 sm:col-span-2">
            <label for="password" class="block text-sm font-medium text-gray-700">
              密码
            </label>
            <div class="mt-1">
              <input v-model="password" id="password" name="password" type="password" required=""
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-400 focus:border-blue-400 sm:text-sm" />
            </div>
          </div>
          <div class="col-span-3 sm:col-span-2">
            <label for="password_confirmation" class="block text-sm font-medium text-gray-700">
              确认密码
            </label>
            <div class="mt-1">
              <div class="mt-1">
                <input v-model="password_confirmation" id="password_confirmation" name="password_confirmation"
                  type="password" required=""
                  class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-400 focus:border-blue-400 sm:text-sm" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="px-4 py-3 bg-gray-100 sm:px-6">
        <Loading class="w-16">
          <button type="submit"
            class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400">
            保存
          </button>
        </Loading>
      </div>
    </div>
  </form>
</template>

<script>
  export default {
    data() {
      return {
        current_password: null,
        password: null,
        password_confirmation: null,
      }
    },

    methods: {
      async update() {
        await this.$axios.put('/api/password', {
          current_password: this.current_password,
          password: this.password,
          password_confirmation: this.password_confirmation,
        })
        this.$toast.success("保存成功");
      }
    }
  }
</script>
