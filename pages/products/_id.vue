<template>
  <div class="mt-2">
    <nav class="flex mt-2 mb-6">
      <ol class="flex items-center space-x-4">
        <li>
          <div class="flex items-center">
            <NuxtLink :to="{ path: '/', query: { category_id: category.parent.id }}"
              class="text-sm font-medium text-gray-500 hover:text-gray-700">
              {{ category.parent.name }}
            </NuxtLink>
          </div>
        </li>

        <li>
          <div class="flex items-center">
            <svg class="flex-shrink-0 h-5 w-5 text-gray-300" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
              viewBox="0 0 20 20" aria-hidden="true">
              <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
            </svg>
            <div class="ml-4 text-sm font-medium text-gray-500">
              <NuxtLink :to="/categories/+category.id" class="text-sm font-medium text-gray-500 hover:text-gray-700">
                {{ category.name }}
              </NuxtLink>
            </div>
          </div>
        </li>
      </ol>
    </nav>

    <div class="flex flex-col lg:flex-row space-y-6 lg:space-y-0 space-x-0 lg:space-x-16">
      <div class="w-full lg:w-1/2">
        <img :src="desktopPreview[0]" alt="">
      </div>
      <div class="w-full lg:w-1/2">
        <div class="bg-white">
          <div class="pb-6">
            <h3 class="text-2xl leading-6 font-medium text-gray-900">
              {{ product.name }}
            </h3>
          </div>
          <div class="border-t border-gray-200">
            <dl class="divide-y divide-gray-200">
              <div class="py-5 grid grid-cols-3 gap-4">
                <dt class="text-sm font-medium text-gray-500">
                  平台
                </dt>
                <dd class="col-span-2 -ml-0.5">
                  <span
                    class="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium border border-gray-200 text-gray-500">
                    HTML
                  </span>
                  <span
                    class="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium border border-gray-200 text-gray-500">
                    Vue
                  </span>
                  <span
                    class="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium border border-gray-200 text-gray-500">
                    React
                  </span>
                </dd>
              </div>

              <div class="py-4 grid grid-cols-3 gap-4">
                <dt class="text-sm font-medium text-gray-500">
                  代码行数
                </dt>
                <dd class="text-sm text-gray-500 col-span-2">
                  约 {{ product.code_rows }} 行
                </dd>
              </div>

              <div class="py-4 grid grid-cols-3 gap-4">
                <dt class="text-sm font-medium text-gray-500">
                  售价
                </dt>
                <dd class="text-lg text-red-700 font-medium col-span-2">
                  ¥ {{ product.price }}
                </dd>
              </div>
            </dl>
          </div>
        </div>
        <div class="flex justify-end mt-6">
          <button
            class="w-full md:w-32 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">加入购物车</button>
        </div>
      </div>
    </div>

    <div class="relative py-16">
      <div class="absolute inset-0 flex items-center" aria-hidden="true">
        <div class="w-full border-t border-gray-300"></div>
      </div>
    </div>

    <div>
      <nav class="flex justify-center space-x-6 mb-6">
        <button v-for="tab in tabs" :key="tab.name" @click="currentTabName = tab.name"
          :class="[tab.name == currentTabName ? 'bg-gray-200 text-gray-500' : 'text-gray-500', 'px-3 py-2 font-medium rounded-md focus:outline-none']">
          {{ tab.label }}
        </button>
      </nav>

      <div v-if="currentTabName == 'desktop'">
        <img v-for="(src,index) in desktopPreview" :key="index" :src="src" :alt="product.name"
          class="rounded-xl bg-gray-200 p-8 md:p-16 mb-6">
      </div>

      <div v-if="currentTabName == 'mobile'">
        <img v-for="(src,index) in mobilePreview" :key="index" :src="src" :alt="product.name"
          class="rounded-xl bg-gray-200 p-8 mb-6 w-full md:w-96 mx-auto">
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    auth: false,

    async asyncData({ $axios, params }) {
      const { data } = await $axios.get('/api/products/' + params.id)
      return { product: data }
    },

    data() {
      return {
        currentTabName: 'desktop',
        tabs: [
          { name: 'desktop', label: '电脑端预览', },
          { name: 'mobile', label: '手机端预览', },
        ]
      }
    },

    computed: {
      mobilePreview() {
        return this.product.preview.mobile
      },
      desktopPreview() {
        return this.product.preview.desktop
      },
      category() {
        return this.product.category
      }
    }
  }
</script>
