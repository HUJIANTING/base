const getters = {
  sidebar: (state) => { // 获取右边菜单栏cookie
    return state.app.sidebar
  },
  visitedViews: (state) => { // 获取右边菜单栏状态
    return state.app.visitedViews
  },
  menus: (state) => { // 获取后台接口返回路由表
    return state.user.menus
  },
  elements: (state) => { // 获取后台接口返回按钮权限
    return state.user.userInfo.permissions
  },
  permission_routers: (state) => { // 获取已过滤家本地路由表
    return state.permission.routers
  },
  addRouters: (state) => { // 获取已过滤后台返回路由表
    return state.permission.addRouters
  }
}
export default getters
