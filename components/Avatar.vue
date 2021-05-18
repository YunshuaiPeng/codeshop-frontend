<template>
  <div class="relative inline-block text-left">
    <div>
      <button type="button" @click="toggle"
        class="bg-gray-100 rounded-full flex items-center focus:outline-none focus:ring-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
        aria-expanded="true" aria-haspopup="true">
        <span class="sr-only">{{ auth.user.name }}</span>
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </button>
    </div>

    <div v-if="show" v-on-clickaway="toggle"
      class="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none"
      role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
      <div class="py-1" role="none">
        <div href="#" class="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1">{{ auth.user.name }}
        </div>
      </div>
      <div class="py-1" role="none">
        <a href="#" class="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100 focus:outline-none" role="menuitem"
          tabindex="-1">个人中心</a>
        <form @submit.prevent="logout">
          <Loading>
            <button type="submit"
              class="text-gray-700 block w-full text-left px-4 py-2 text-sm  hover:bg-gray-100 focus:outline-none"
              role="menuitem" tabindex="-1">
              退出
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
    computed: {
      ...mapState(['auth']),
    },
    data() {
      return {
        show: false,
      }
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
