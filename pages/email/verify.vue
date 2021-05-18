<template>
  <div class="max-w-md mx-auto mt-16">
    <Loading>
      <div v-if="verified">
        <div class="text-green-600">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16" fill="none" viewBox="0 0 24 24"
            stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        </div>

        <div class="mt-8">
          <h2 class="text-lg font-medium">
            邮箱已验证
          </h2>
        </div>
      </div>
    </Loading>
  </div>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    mounted() {
      this.verifyEmail()
    },

    computed: {
      ...mapState(['auth']),

      verified() {
        return this.auth.user.email_verified_at != null
      }
    },

    methods: {
      async verifyEmail() {
        const link = this.$route.query.link
        if (!link) return

        this.$router.replace({ 'query': null })

        if (this.auth.user.email_verified_at) return

        try {
          const { data } = await this.$axios.get(link)

          // 验证邮箱之后更新用户，主要是为了填充 email_verified_at 字段
          this.$auth.setUser(data)
        } catch (error) {
          console.log(error)
        }
      },
    }
  }
</script>
