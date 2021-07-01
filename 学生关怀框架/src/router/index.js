import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* layout */
import Layout from '@/layout/index'

/**
 * icon : the icon show in the sidebar
 * hidden : if `hidden:true` will not show in the sidebar
 * redirect : if `redirect:noredirect` will no redirct in the levelbar
 * noDropdown : if `noDropdown:true` will has no submenu
 * meta : { role: ['admin'] }  will control the page role
 **/
export const constantRouterMap = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error/401'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: '首页',
    hidden: true,
    children: [
      {
        path: '/dashboard',
        component: () => import('@/views/dashboard/index')
      }
    ]
  }

]

export default new Router({
  // mode: 'history', // 后端支持可开
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRouterMap
})

export const asyncRouterMap = [
  {
    path: '/admin',
    component: Layout,
    name: '系统管理',
    children: [
      {
        path: '/admin/frontUser',
        component: () => import('@/views/admin/frontUser'),
        name: '前端用户管理'
      },
      {
        path: '/admin/backstageUser',
        component: () => import('@/views/admin/backstageUser'),
        name: '用户管理'
      },
      {
        path: '/admin/role',
        component: () => import('@/views/admin/role'),
        name: '角色权限管理'
      },
      {
        path: '/admin/operaJournal',
        component: () => import('@/views/admin/operaJournal'),
        name: '日志管理'
      },
      {
        path: '/admin/menu',
        component: () => import('@/views/admin/menu'),
        name: '菜单管理'
      },
      {
        path: '/admin/department',
        component: () => import('@/views/admin/department'),
        name: '部门管理'
      }

    ]
  }

]

const originalPush = Router.prototype.push
Router.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}
