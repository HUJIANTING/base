
import confirmView from 'components/basics/confirm/index.vue'
export default {
  install(Vue, options) {
    // 初始化
    var start = function() {
      // 创建构造器，把组件挂载到构造器
      const ConfirmConstructor = Vue.extend(confirmView)
      // 实例化构造器
      const installConfirm = new ConfirmConstructor()
      // 在body创建一个div标签，用来存放构造器的
      const container = document.createElement('div')
      // 把实例挂在刚刚创建的新的div标签
      installConfirm.$mount(container)
      // 把刚刚创建的div标签，渲染在body，生成新的div标签
      document.body.appendChild(installConfirm.$el)
      // 返回实例化对象
      return installConfirm
    }
    Vue.myGlobalMethods = function(Vue, options) { // 1. 添加全局方法或属性，如:  vue-custom-element
      console.log(1)
    }

    Vue.directive('my-directive', { // 2. 添加全局资源：指令/过滤器/过渡等，如 vue-touch
      bind(el, binding, vnode, oldVnode) {
        // 逻辑...
      }
    })

    Vue.mixin({
      created: function() { // 3. 通过全局 mixin方法添加一些组件选项，如: vuex
        // 逻辑...
      }
    })

    Vue.prototype.$customComfirm = function(options) { // 4. 添加实例方法，通过把它们添加到 Vue.prototype 上实现
      // 触发comfirm组件里面的showComfirm函数，触发初始化显示
      return new Promise((resolve, reject) => {
        // 将promise的两个状态传给所需要的的组件
        var promiseStatus = {
          resolve,
          reject
        }
        start().showComfirm(options, promiseStatus)
      })
    }
  }
}
