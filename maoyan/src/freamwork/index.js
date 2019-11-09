/* 自己来封装组件库  - 插件*/

import Loading from './tpl/Loading.vue'
const Fw = {
  install: function ( Vue ) {
    Vue.component('Loading', Loading )
  }
}

export default Fw 