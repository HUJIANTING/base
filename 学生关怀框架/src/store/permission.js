import { constantRouterMap, asyncRouterMap } from '@/router'

/**
 * 递归过滤异步路由表
 */
function filterAsyncRouter(asyncRouterMap, menusName) {
  const accessedRouters = asyncRouterMap.filter(route => {
    let isSame = false
    menusName.forEach(item => {
      if (route.path === item) {
        isSame = true
      }
    })
    if (route.children && route.children.length) {
      route.children = filterAsyncRouter(route.children, menusName)
    }
    return isSame
  })
  return accessedRouters
}

const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
    }
  },
  actions: {
    GenerateRoutes({ commit }, menus) {
      const menusName = []
      menus.forEach(item => {
        menusName.push(item.path)
        item.children.forEach((ite) => {
          menusName.push(ite.path)
        })
      })
      const accessedRouters = filterAsyncRouter(asyncRouterMap, menusName)
      commit('SET_ROUTERS', accessedRouters)
    }
  }
}

export default permission
