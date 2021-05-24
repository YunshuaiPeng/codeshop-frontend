<template>
  <div>
    <div class="font-semibold text-sm">{{ response.status }} {{ response.statusText }}</div>
    <div class="text-xs mt-2">
      <pre style="white-space: pre-wrap; word-break: break-all;">{{ response.data }}</pre>
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
  }
</script>
