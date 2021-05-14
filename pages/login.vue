<template>
  <div>
    <form @submit.prevent="login">
      <div>
        <label>Username</label>
        <input type="text" v-model="email" />
      </div>
      <div>
        <label>Password</label>
        <input type="text" v-model="password" />
      </div>
      <div>
        <button type="submit">Submit</button>
      </div>
    </form>
  </div>
</template>

<script>
  export default {
    auth: 'guest',

    data() {
      return {
        email: 'admin@admin.com',
        password: '123456789',
        errors: null
      }
    },

    methods: {
      async login() {
        try {
          const response = await this.$auth.loginWith('laravelSanctum', {
            data: {
              email: this.email,
              password: this.password,
            },
          })
          this.$router.push('/')
        } catch (err) {
          console.log(err)
          this.errors = err.response.data.errors
        }
      }
    },
  }
</script>
