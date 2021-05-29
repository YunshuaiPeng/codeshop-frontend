<template>
  <div v-if="show" class="fixed inset-0 flex items-center justify-center z-10 bg-transparent">
    <div class="w-16 h-16 -mt-24 rounded-lg opacity-50 flex justify-center items-center bg-black text-white">
      <svg class="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
        </path>
      </svg>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        show: false
      }
    },
    watch: {
      '$store.state.request.count': _.debounce(function(newVal, oldVal) {
        this.sync(newVal)
      }, 1000),
    },
    methods: {
      sync(requestingCount) {
        this.show = requestingCount > 0
      },
    }
  }
</script>
