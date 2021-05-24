import ResponseToast from "@/components/ResponseToast.vue"

export default function({ $axios, redirect, store, $toast }) {
  $axios.onRequest(config => {
    store.commit('request/increment')
  })

  $axios.onResponse(response => {
    store.commit('request/decrement')
  })

  $axios.onError(error => {
    store.commit('request/reset')

    const code = error.response.status

    switch (code) {
      case 401: // Unauthorized
        store.$auth.logout() // 清除 cookie 等工作
        redirect('/login')
        break

      case 419: // laravel 中 csrf 验证错误时状态码是419
        store.$auth.logout() // 清除 cookie 等工作
        window.location.reload()
        redirect('/login')
        break

      case 422: // Unprocessable Entity(laravel 中参数验证错误时状态码是422)
        $toast.error({
          component: ResponseToast,
          props: {
            response: error.response
          },
        }, { timeout: false })
        break

      case 500: // Internal Server Error
        $toast.error({
          component: ResponseToast,
          props: {
            response: error.response
          },
        }, { timeout: false })
        break

      default:
        $toast.error({
          component: ResponseToast,
          props: {
            response: error.response
          },
        }, { timeout: false })
        break
    }

    return new Promise(() => { });
  })
}
