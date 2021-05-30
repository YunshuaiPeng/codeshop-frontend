<template>
  <div class="lg:px-24 lg:py-6">
    <div class="bg-white border border-gray-200 overflow-hidden sm:rounded-lg">
      <div class="px-4 py-5 sm:px-6">
        <div v-if="order.is_paid">
          <h3 class="text-lg leading-6 font-medium text-gray-900">
            <span class="text-green-600">订单已支付</span>
          </h3>
        </div>
        <div v-if="order.is_unpaid">
          <h3 class="text-lg leading-6 font-medium text-gray-900">
            <span class="text-yellow-600">订单未支付</span>
          </h3>
          <NuxtLink :to="/mock-payments/+order.payment.identifier" class="mt-1 max-w-2xl text-sm text-blue-500">
            去支付
          </NuxtLink>
        </div>
        <div v-if="order.is_canceled">
          <h3 class="text-lg leading-6 font-medium text-gray-900">
            <span class="text-red-600">订单已取消</span>
          </h3>
        </div>
      </div>
      <div class="border-t border-gray-200 px-4 py-5 sm:p-0">
        <dl class="sm:divide-y sm:divide-gray-200">
          <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt class="text-sm font-medium text-gray-500">
              订单号
            </dt>
            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {{ order.identifier }}
            </dd>
          </div>
          <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt class="text-sm font-medium text-gray-500">
              下单时间
            </dt>
            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {{ created_at }}
            </dd>
          </div>
          <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt class="text-sm font-medium text-gray-500">
              交易金额
            </dt>
            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              ¥{{ order.amount }}
            </dd>
          </div>
          <div v-if="order.is_paid" class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt class="text-sm font-medium text-gray-500">
              代码
            </dt>
            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <ul class="border border-gray-200 rounded-md divide-y divide-gray-200">
                <li v-for="(item,index) in order.items"
                  class="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                  <div class="w-0 flex-1 flex items-center">
                    <span class="ml-2 flex-1 w-0 truncate">
                      <img :src="item.preview.desktop[0]" :alt="item.name">
                    </span>
                    <span class="ml-2 flex-1 w-0 truncate">
                      {{ item.name }}
                    </span>
                    <span class="ml-2 flex-1 w-0 truncate">
                      ¥{{ item.price }}
                    </span>
                  </div>
                  <div class="ml-4 flex-shrink-0">
                    <div class="flex flex-col items-start space-y-2">
                      <button @click="downloadHTML(item)" class="font-medium text-blue-500 hover:text-blue-400">
                        下载(HTML)
                      </button>
                      <button @click="downloadVue(item)" class="font-medium text-blue-500 hover:text-blue-400">
                        下载(Vue)
                      </button>
                      <button @click="downloadReact(item)" class="font-medium text-blue-500 hover:text-blue-400">
                        下载(React)
                      </button>
                    </div>
                  </div>
                </li>
              </ul>
            </dd>
          </div>
        </dl>
      </div>
    </div>

  </div>
</template>
<script>
  export default {
    async asyncData({ $axios, params }) {
      const order = await $axios.$get('/api/orders/' + params.id)

      return { order }
    },

    computed: {
      created_at() {
        let date = new Date(this.order.created_at)
        return date.toLocaleString()
      }
    },

    methods: {
      download(content, filename) {
        let a = document.createElement("a");
        let file = new Blob([content], { type: 'text/plain' });
        a.href = URL.createObjectURL(file);
        a.download = filename;
        a.click();
      },
      downloadHTML(item) {
        let content = item.code.html
        let filename = 'code.html'
        this.download(content, filename)
      },
      downloadVue(item) {
        let content = item.code.vue
        let filename = 'code.vue'
        this.download(content, filename)
      },
      downloadReact(item) {
        let content = item.code.react
        let filename = 'code.js'
        this.download(content, filename)
      },
    },
  }
</script>
