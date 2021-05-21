import { mixin as clickaway } from 'vue-clickaway'
import Vue from 'vue'

if (!Vue.__clickaway_mixin__) {
  Vue.__clickaway_mixin__ = true

  Vue.mixin({
    mixins: [clickaway],
  })
}


