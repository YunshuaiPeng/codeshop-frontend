<template>
  <div class="lg:px-24 lg:py-6 xl:px-36">
    <div class="border-b border-gray-200">
      <nav class="-mb-px flex" aria-label="Tabs">
        <button @click="status = null"
          :class="[status == null ? 'border-blue-400 text-blue-500' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300']"
          class="focus:outline-none w-1/4 py-4 px-1 text-center border-b-2 font-medium text-sm">
          全部
        </button>
        <button @click="status = 'paid'"
          :class="[status == 'paid' ? 'border-blue-400 text-blue-500' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300']"
          class="focus:outline-none w-1/4 py-4 px-1 text-center border-b-2 font-medium text-sm">
          已支付
        </button>
        <button @click="status = 'unpaid'"
          :class="[status == 'unpaid' ? 'border-blue-400 text-blue-500' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300']"
          class="focus:outline-none w-1/4 py-4 px-1 text-center border-b-2 font-medium text-sm">
          未支付
        </button>
        <button @click="status = 'canceled'"
          :class="[status == 'canceled' ? 'border-blue-400 text-blue-500' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300']"
          class="focus:outline-none w-1/4 py-4 px-1 text-center border-b-2 font-medium text-sm">
          已取消
        </button>
      </nav>
    </div>

    <div class="bg-white overflow-hidden sm:rounded-md">
      <ul class="divide-y divide-gray-200">
        <li v-for="(order,index) in orders" :key="index">
          <NuxtLink :to="/orders/+order.identifier" class="block hover:bg-gray-50">
            <div class="flex items-center px-4 py-4 sm:px-6">
              <div class="min-w-0 flex-1 flex items-center">
                <div class="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
                  <div>
                    <p class="text-sm font-medium truncate">{{ order.identifier }}</p>
                    <p class="mt-2 flex items-center text-sm text-gray-500">
                      <span class="truncate">¥{{ order.amount }}</span>
                    </p>
                  </div>

                  <div class="mt-2 md:mt-0">
                    <p class="text-sm text-gray-900">
                      {{ created_at(order.created_at) }}
                    </p>
                    <p v-if="order.is_paid" class="mt-2 flex items-center text-sm text-green-500">
                      已支付
                    </p>
                    <p v-if="order.is_unpaid" class="mt-2 flex items-center text-sm text-yellow-500">
                      未支付
                    </p>
                    <p v-if="order.is_canceled" class="mt-2 flex items-center text-sm text-red-500">
                      已取消
                    </p>
                  </div>

                </div>
              </div>
              <div>
                <svg class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                  fill="currentColor" aria-hidden="true">
                  <path fill-rule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clip-rule="evenodd" />
                </svg>
              </div>
            </div>
          </NuxtLink>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    async asyncData({ $axios }) {
      const orders = await $axios.$get('/api/orders')

      return { orders }
    },

    data() {
      return {
        status: null
      }
    },

    watch: {
      status: function() {
        this.fetchOrders()
      }
    },

    methods: {
      created_at(created_at) {
        let date = new Date(created_at)
        return date.toLocaleString()
      },
      async fetchOrders() {
        const orders = await this.$axios.$get('/api/orders', {
          params: {
            status: this.status
          }
        })
        this.orders = orders
      }
    }
  }
</script>
