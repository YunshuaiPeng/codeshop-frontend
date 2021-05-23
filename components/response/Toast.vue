<template>
  <div>
    <div class="font-semibold text-sm">{{ response.status }} {{ response.statusText }}</div>
    <component v-bind:is="currentComponent" v-if="response.data" :data="response.data"></component>
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
      currentComponent() {
        return `Response${this.response.status}`
      },
    },
  }
</script>
