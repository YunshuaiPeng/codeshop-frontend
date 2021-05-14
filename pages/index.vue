<template>
  <div>
    index
    <form @submit.prevent="logout">
      <div>
        <button type="submit">logout</button>
      </div>
    </form>

  </div>
</template>

<script>
  export default {
    auth: 'guest',

    methods: {
      async logout() {
        try {
          const response = await this.$auth.logout()
        } catch (err) {
        }
      },
    },
  }
</script>
