<template>
  <div class="max-w-md mx-auto mt-8 sm:mt-16">
    <div class="flex flex-col items-center space-y-6">
      <qrcode-vue :value="value" :size="size" level="H" class="flex justify-center" />
      <div class="text-sm text-gray-500">点击按钮模拟支付</div>
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
    async asyncData({ $axios, params, redirect }) {
      const payment = await $axios.$get('/api/mock-payments/' + params.id)
      if (payment.is_paid) {
        redirect('/orders/' + payment.payable.identifier)
      }
      return { payment }
    },

    data() {
      return {
        value: '',
        size: 200,
      }
    },

    methods: {
      async pay() {
        const data = await this.$axios.$put('/api/mock-payments/' + this.payment.identifier)

        this.$toast.success(data.message)

        setTimeout(() => {
          this.$router.push('/orders/' + this.payment.payable.identifier)
        }, 2000)
      }
    },

    components: {
      QrcodeVue,
    },
  }
</script>
