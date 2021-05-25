<template>
  <div>
    <div class="font-semibold text-sm">{{ response.status }} {{ response.statusText }}</div>
    <div class="text-xs mt-2">
      <pre style="white-space: pre-wrap; word-break: break-all;">{{ data }}</pre>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      response: {
        type: Object,
        required: true
      }
    },

    computed: {
      data() {
        switch (this.response.status) {
          case 422:
            return this.response.data.errors
          default:
            return _.pickBy(this.response.data, (v, k) => k != 'trace')
        }
      }
    }
  }
</script>
