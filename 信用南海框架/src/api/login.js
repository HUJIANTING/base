import request from 'utils/request'

// 登录获取token
export function loginByToken(params) {
  return request({
    url: '/auth/oauth/token',
    headers: {
      isToken: false,
      // 'Authorization': 'Basic a2FtZnVfd3g6a2FtZnVfd3g=',
      'Authorization': 'Basic a2FtZnVfd2ViOmthbWZ1X3dlYg==',
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    },
    method: 'post',
    params: params
  })
}

// 获取个人信息
export function getUserInfo() {
  return request({
    url: '/admin/user/info',
    method: 'get'
  })
}

// 退出登录
export function logout() {
  return request({
    url: '/auth/token/logout',
    method: 'delete'
  })
}

// 获取路由表
export function getMenu(id) {
  return request({
    url: '/admin/menu',
    params: { parentId: id },
    method: 'get'
  })
}
