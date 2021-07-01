import request from 'utils/request'

// 用户列表
export function getUserPage(params) {
  return request({
    url: '/admin/user/page',
    method: 'get',
    params
  })
}

// 头像上传
export function uploadAvatar(data) {
  return request({
    url: '/app/file/upload/images',
    method: 'POST',
    data
  })
}
// 删除头像
export function deleteAvatar(params) {
  return request({
    url: '/app/file/delete',
    method: 'get',
    params
  })
}

// 查看用户
export function getChechUser(params) {
  return request({
    url: '/admin/user/' + params,
    method: 'get'
  })
}

// 角色选项
export function getRoleList() {
  return request({
    url: '/admin/role/list',
    method: 'get'
  })
}

// 角色列表
export function getRolePage(params) {
  return request({
    url: '/admin/role/page',
    method: 'get',
    params
  })
}

// 添加用户
export function getAddUser(data) {
  return request({
    url: '/admin/user',
    method: 'post',
    data
  })
}

// 修改用户
export function getmodifyUser(data) {
  return request({
    url: '/admin/user',
    method: 'put',
    data
  })
}

// 删除用户
export function getDeleteUser(params) {
  return request({
    url: '/admin/user/' + params,
    method: 'delete'
  })
}

// 添加角色
export function getAddRole(data) {
  return request({
    url: '/admin/role',
    method: 'post',
    data
  })
}

// 修改角色
export function getmodifyRole(data) {
  return request({
    url: '/admin/role',
    method: 'put',
    data
  })
}

// 查看角色
export function getChechRole(params) {
  return request({
    url: '/admin/role/' + params,
    method: 'get'
  })
}

// 删除角色
export function getDeleteRole(params) {
  return request({
    url: '/admin/role/' + params,
    method: 'delete'
  })
}

// 查询所有菜单
export function getMeunTree() {
  return request({
    url: '/admin/role/menu/tree',
    method: 'get'
  })
}

// 查询角色菜单权限
export function getSelfMeunTree(params) {
  return request({
    url: '/admin/menu/tree/' + params,
    method: 'get'
  })
}

// 查询菜单按钮数据
export function getMeunBtn(params) {
  return request({
    url: '/admin/role/detail/' + params,
    method: 'get'
  })
}

// 更新角色权限
export function getRoleMeun(data) {
  return request({
    url: '/admin/role/menu',
    method: 'put',
    data
  })
}

/**
 * 菜单管理
 */
// 菜单列表
export function getAdminMeun() {
  return request({
    url: '/admin/menu/tree',
    method: 'get'
  })
}

// 新增菜单---菜单/按钮
export function getAddMeun(data) {
  return request({
    url: '/admin/menu',
    method: 'post',
    data
  })
}

// 修改菜单---菜单/按钮
export function getEditMeun(data) {
  return request({
    url: '/admin/menu',
    method: 'put',
    data
  })
}

// 菜单树---下拉列表
export function getMenuTree() {
  return request({
    url: '/admin/menu/tree',
    method: 'get'
  })
}

// 菜单详情
export function getMenuList(params) {
  return request({
    url: '/admin/menu/' + params,
    method: 'get'
  })
}

// 菜单/按钮删除
export function deleteMenu(params) {
  return request({
    url: '/admin/menu/' + params,
    method: 'delete'
  })
}

/**
 * 日志管理
 */
// 操作日志列表
export function operaJournalList(params) {
  return request({
    url: '/admin/log/page',
    method: 'get',
    params
  })
}

// 操作日志类型
export function operaJournaltype() {
  return request({
    url: '/admin/dict/type/log_type',
    method: 'get'
  })
}

// 删除日志
export function getDeleteLog(params) {
  return request({
    url: '/admin/log/' + params,
    method: 'DELETE'
  })
}

// 删除日志
export function getUserEdit(data) {
  return request({
    url: '/admin/user/edit',
    method: 'put',
    data
  })
}

/**
 * 部门管理
 */
// 部门树
export function getDepartmentTree() {
  return request({
    url: '/admin/dept/tree',
    method: 'get'
  })
}

// 部门列表
export function getDepartmentList(params) {
  return request({
    url: '/admin/dept/details',
    method: 'get',
    params
  })
}

// 部门详情
export function getDepartmentDetails(params) {
  return request({
    url: '/admin/dept/info/' + params,
    method: 'get'
  })
}

// 部门新增
export function addDepartment(data) {
  return request({
    url: '/admin/dept/save',
    method: 'post',
    data
  })
}

// 部门修改
export function editDepartment(data) {
  return request({
    url: '/admin/dept/update',
    method: 'post',
    data
  })
}

// 部门删除
export function delDepartment(data) {
  return request({
    url: '/admin/dept/delete/' + data,
    method: 'post'
  })
}
