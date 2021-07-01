import Vue from 'vue'
import store from '../../store'

Vue.directive('allow', {
  inserted: (el, binding, vnode) => {
    let permissionList = store.state.user.userInfo.permissions
    if (!permissionList.includes(binding.value)) {
      el.parentNode.removeChild(el)
    }
  }
})
