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
              <input v-model="current_password" id="current_password" name="current_password" type="text" required=""
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>
          </div>

          <div class="col-span-3 sm:col-span-2">
            <label for="password" class="block text-sm font-medium text-gray-700">
              密码
            </label>
            <div class="mt-1">
              <input v-model="password" id="password" name="password" type="text" required=""
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>
          </div>
          <div class="col-span-3 sm:col-span-2">
            <label for="password_confirmation" class="block text-sm font-medium text-gray-700">
              确认密码
            </label>
            <div class="mt-1">
              <div class="mt-1">
                <input v-model="password_confirmation" id="password_confirmation" name="password_confirmation"
                  type="text" required=""
                  class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
              </div>
            </div>
          </div>
        </div>

        <div v-if="errors" class="mt-4 text-red-500">
          <div v-for="(item, i) in errors" :key="i">
            <div v-for="(error, j) in item" :key="j">
              {{ error }}
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
  export default {
    data() {
      return {
        current_password: null,
        password: null,
        password_confirmation: null,
        errors: null,
      }
    },

    methods: {
      async update() {
        try {
          await this.$axios.put('/api/password', {
            current_password: this.current_password,
            password: this.password,
            password_confirmation: this.password_confirmation,
          })
          this.$toast.success("保存成功");
        } catch (error) {
          this.errors = error.response.data.errors
        }
      }
    }
  }
</script>
