<template>
  <div class="space-y-10">
    <div v-for="(category, i) in categories" :key="i">
      <div :id="category.id" class="text-lg font-semibold text-gray-500 pb-4">
        {{ category.name }}
      </div>

      <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 md:grid-cols-3 md:gap-8">
        <div v-for="(child, j) in category.children" :key="j"
          class="relative border border-gray-200 rounded-lg focus:outline-none">
          <div class="rounded-t-lg overflow-hidden">
            <img :src="child.icon" alt="child.name" class="rounded-t-lg">
          </div>
          <div class="p-6">
            <h3 class="text-lg font-medium">
              <NuxtLink :to="/categories/+child.id" class="focus:outline-none">
                <span class="absolute inset-0" aria-hidden="true"></span>
                {{ child.name }}
              </NuxtLink>
            </h3>
            <p class="mt-2 text-sm text-gray-500">
              {{ child.products_count }} 个组件
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    auth: false,

    // FIXME:https://github.com/nuxt-community/router-module/issues/67#issuecomment-726112465
    name: "index",

    async asyncData({ $axios, store }) {
      await store.dispatch('category/fetch')
    },

    mounted() {
      this.scrollToCategory()
    },

    computed: {
      ...mapState({
        categories: state => state.category.categories
      })
    },

    methods: {
      scrollToCategory() {
        let id = this.$route.query.category_id || null

        if (!id) return

        setTimeout(() => {
          document.getElementById(id).scrollIntoView()
        })
      }
    }
  }
</script>
