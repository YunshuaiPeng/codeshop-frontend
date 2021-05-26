<template>
  <div class="relative inline-block text-left">
    <div>
      <button type="button" @click="toggle"
        class="bg-gray-100 rounded-full flex items-center focus:outline-none focus:ring-2 focus:ring-offset-gray-100 focus:ring-blue-400"
        aria-expanded="true" aria-haspopup="true">
        <span class="sr-only">{{ auth.user.name || auth.user.email }}</span>
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </button>
    </div>

    <div v-if="show" v-on-clickaway="toggle"
      class="origin-top-right absolute right-0 mt-2 w-64 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none"
      role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
      <div class="h-20 bg-gray-200"></div>
      <div class="flex flex-col justify-center items-center space-y-2 pb-4">
        <div class="bg-white rounded-full -mt-12">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-24 w-24" fill="none" viewBox="0 0 24 24"
            stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div v-if="auth.user.name" class="text-sm font-semibold">
          {{ auth.user.name }}
        </div>
        <div class="text-xs text-gray-500">
          {{ auth.user.email }}
        </div>
        <div class="pt-1">
          <div class="flex justify-center items-center space-x-2">
            <NuxtLink title="自定义个人资料" to="/account/profile" class="rounded-full border border-gray-300 p-1">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
            </NuxtLink>
            <NuxtLink title="密码" to="/account/password" class="rounded-full border border-gray-300 p-1">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
              </svg>
            </NuxtLink>
          </div>
        </div>
      </div>

      <div>
        <a href="#"
          class="text-gray-700 block w-full px-4 py-2 inline-flex items-center space-x-3 text-sm hover:bg-gray-100 focus:outline-none"
          role="menuitem" tabindex="-1">
          <Logo class="h-5 w-5"></Logo>
          <span>订单管理</span>
        </a>
        <form @submit.prevent="logout">
          <Loading>
            <button type="submit"
              class="text-gray-700 block w-full inline-flex items-center space-x-3 text-left px-4 py-2 text-sm  hover:bg-gray-100 focus:outline-none"
              role="menuitem" tabindex="-1">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span>退出登录</span>
            </button>
          </Loading>
        </form>
      </div>

    </div>
  </div>

</template>

<script>
  import { mapState } from 'vuex'

  export default {
    data() {
      return {
        show: false,
      }
    },

    watch: {
      $route(to, from) {
        this.show = false
      }
    },

    computed: {
      ...mapState(['auth']),
    },

    methods: {
      toggle() {
        this.show = !this.show
      },
      async logout() {
        try {
          const response = await this.$auth.logout()
        } catch (error) {
        }
      },
    }
  }
</script>
