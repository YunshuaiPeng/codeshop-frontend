<template>
  <div class="max-w-md mx-auto mt-8 sm:mt-16">
    <div class="text-yellow-600">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="M20.618 5.984A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016zM12 9v2m0 4h.01" />
      </svg>
    </div>
    <div class="mt-8">
      <h2 class="text-lg font-medium">
        请验证您的邮箱
      </h2>
      <p class="mt-2 text-sm text-gray-500">
        邮箱验证连接已经发送到 <strong>{{ auth.user.email }}</strong>，请查收。如果没有收到邮件，点击下方的按钮重新发送。
      </p>
      <form class="space-y-6 mt-8" @submit.prevent="resend">
        <Loading>
          <button type="submit" :disabled="disabled"
            class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            {{ text }}
          </button>
        </Loading>
      </form>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    data() {
      return {
        text: '重新发送邮箱验证连接',
        disabled: false,
      }
    },

    computed: {
      ...mapState(['auth']),
    },

    methods: {
      async resend() {
        try {
          const { status } = await this.$axios.post('/email/resend')
          switch (status) {
            case 204:
              this.disabled = true
              this.text = "您的邮箱已验证，无需操作"
              break;
            case 202:
              this.text = "已发送（点击再次发送）"
              break;
          }
        } catch (error) {
          console.log(error)
        }
      }
    }
  }
</script>

<!--
 <template>
   <div>13</div>
 </template> -->
