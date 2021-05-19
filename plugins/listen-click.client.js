import Vue from 'vue'

export default function({ store }) {
  const handle = (event) => {
    // 如果 event.target 是一个很大的对象(例如 html)
    // vue 会报错：Maximum call stack size exceeded
    try {
      store.commit('loading/setTarget', {
        target: event.target
      })
    } catch (error) {
      console.log(error)
    }
  }

  const mixin = {
    mounted() {
      window.addEventListener('click', handle);
    },
    beforeDestroy() {
      window.removeEventListener('click', handle);
    }
  }

  Vue.mixin({
    mixins: [mixin]
  })
}
