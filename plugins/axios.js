export default function({ $axios, redirect, store }) {
  $axios.onRequest(config => {
    store.commit('loading/debounceIncrement')
  })
  $axios.onResponse(response => {
    store.commit('loading/decrement')
  })
  $axios.onError(error => {
    store.commit('loading/reset')

    const code = error.response.status
    switch (code) {
      case 401:
        window.location.reload()
        redirect('login')
        break
      case 419:
        redirect('login')
        break
      case 422:
        //
        break
      case 500:
        alert(error)
        break
      default:
        alert(error)
    }
  })
}
