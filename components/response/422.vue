<template>
  <div class="text-xs text-gray-500">
    <div v-for="(field, i) in data.errors" :key="i">
      <div v-for="(error, j) in field" :key="j" class="pt-1">
        {{ error }}
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      data: {
        type: Object,
        required: true
      }
    },
  }
</script>
