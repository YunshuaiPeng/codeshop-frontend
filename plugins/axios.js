export default function({ $axios, redirect, store }) {
  $axios.onRequest(config => {
    store.commit('loading/increment')
  })
  $axios.onResponse(response => {
    store.commit('loading/decrement')
  })
  $axios.onError(error => {
    store.commit('loading/decrement')

    const code = error.response.status
    switch (code) {
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
