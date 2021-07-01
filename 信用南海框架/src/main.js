import 'babel-polyfill'// 支持IE执行原生script
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'// 引用element框架
import 'element-ui/lib/theme-chalk/index.css' // 导入elementUI样式
import '@/styles/index.scss' // global css
import '@/permission' // permission control
import Viewer from 'v-viewer' // 引入图片放大插件
import 'viewerjs/dist/viewer.css'
import 'plugins/index'
import 'assets/iconfont/iconfont.js'
import 'assets/iconfont/iconfont.css'
import VueQuillEditor from 'vue-quill-editor'
import * as directives from '../src/components/directive'
Object.keys(directives).forEach(key => Vue.directive(key, directives[key]))
// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

Vue.use(VueQuillEditor /* { default global options } */)
Vue.use(Viewer, {
  defaultOptions: {
    zIndex: 9999
  }
})
Vue.use(ElementUI)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

