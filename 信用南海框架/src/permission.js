import router from './router'
import store from './store'
import NProgress from 'nprogress' // progress bar
import { getStore } from 'utils/store' // progress bar
import 'nprogress/nprogress.css' // progress bar style
// register global progress.
const whiteList = [
  '/login'
]// 不重定向白名单
router.beforeEach((to, from, next) => {
  NProgress.start() // 开启Progress
  if (getStore({ name: 'token' })) { // 判断是否有token
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      if (store.getters.menus.length === 0) { // 判断当前用户是否已拉取完user_info信息
        store.dispatch('GetUserInfo').then(info => { // 拉取user_info
          store.dispatch('GenerateRoutes', store.getters.menus).then(() => { // 生成可访问的路由表
            router.addRoutes(store.getters.addRouters) // 添加可访问路由表
            next({ ...to })
          })
        }).catch(() => {
          store.dispatch('FedLogOut').then(() => {
            next({ path: '/login' })
            NProgress.done()
          })
        })
      } else {
        // 没有动态改变权限的需求可直接next()
        next()
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
      next()
    } else {
      next('/login') // 否则全部重定向到登录页
      NProgress.done() // 在hash模式下 改变手动改变hash 重定向回来 不会触发afterEach 暂时hack方案 ps：history模式下无问题，可删除该行！
    }
  }
})

router.afterEach(() => {
  NProgress.done() // 结束Progress
})
