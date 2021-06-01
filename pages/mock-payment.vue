<template>
  <div class="max-w-md mx-auto mt-8 sm:mt-16">
    <div class="flex flex-col items-center space-y-6">
      <qrcode-vue :value="api" :size="size" level="H" class="flex justify-center" />
      <div class="text-sm text-gray-500">模拟支付扫码，或点击按钮进行模拟支付</div>
      <button @click="pay"
        class="w-24 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400">
        支付
      </button>
    </div>
  </div>
</template>
<script>
  import QrcodeVue from 'qrcode.vue'

  export default {
    async asyncData({ $axios, params }) {
      const { data } = await $axios.get('/api/mock-payments/' + params.id)
      return { category: data }
    },

    mounted() {
      this.initMockPaymentAPI()
    },

    data() {
      return {
        api: '',
        size: 200,
      }
    },

    methods: {
      initMockPaymentAPI() {
        this.api = this.$config.BASE_URL + '/api/mock-payments/' + this.$route.query.payment_identifier
      },

      async pay() {
        const data = await this.$axios.$put('/api/mock-payments/' + this.$route.query.payment_identifier)

        this.$toast.success(data.message)

        setTimeout(() => {
          this.$router.push('/orders/' + this.$route.query.order_identifier)
        }, 5000)
      }
    },

    components: {
      QrcodeVue,
    },
  }
</script>
