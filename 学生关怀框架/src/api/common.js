import request from 'utils/request'

// 获取二级部门列表
export function getSecondDepartment() {
  return request({
    url: '/admin/dept/getSecondNode',
    method: 'get'
  })
}

// 错误文件导出
export function errorDataDown(data) {
  return request({
    url: '/web/dataUpload/errorDataDown',
    method: 'post',
    data,
    responseType: 'blob'
  })
}

// excel列表数据导出
export function exportExcel(data) {
  return request({
    url: '/web/dataExport/excel',
    method: 'post',
    data,
    responseType: 'blob'
  })
}

// 删除公示设置
export function deleteTableName(params) {
  return request({
    url: '/web/api/creditpublicityconfig/delete',
    method: 'get',
    params
  })
}

// 查询公示设置
export function tableNameInfo(params) {
  return request({
    url: '/web/api/creditpublicityconfig/info',
    method: 'get',
    params
  })
}

// 新增公示设置
export function tableNameSave(data) {
  return request({
    url: '/web/api/creditpublicityconfig/save',
    method: 'post',
    data
  })
}

// 修改公示设置
export function tableNameUpdate(data) {
  return request({
    url: '/web/api/creditpublicityconfig/update',
    method: 'post',
    data
  })
}
