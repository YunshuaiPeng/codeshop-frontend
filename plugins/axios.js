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
      case 401: // 未登录
        window.location.reload()
        return redirect('login')
      case 419: // laravel 中 csrf 验证错误
        return redirect('login')
      case 422: // laravel 中的参数验证错误
        // 由页面单独处理
        return false
      case 405: // 请求的方法不正确，例如该用 post 却用成了 get
      case 500: // 服务器内部错误
        $toast.error(code + ' 发生了错误', { timeout: false })
        break
      default:
        $toast.error(code + '发生了错误', { timeout: false })
    }

    return Promise.resolve(false)
  })
}
