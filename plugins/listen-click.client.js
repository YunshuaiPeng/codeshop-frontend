import Vue from 'vue'

export default function({ store }) {
  const handle = (event) => {
    // 如果 event.target 是一个很大的对象(例如 html)
    // vue 会报错：Maximum call stack size exceeded
    try {
      store.commit('request/setTarget', {
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

  if (!Vue.__listen_click_mixin__) {
    Vue.__listen_click_mixin__ = true

    Vue.mixin({
      mixins: [mixin]
    })
  }
}
