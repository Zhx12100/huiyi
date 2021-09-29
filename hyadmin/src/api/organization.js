import request from '@/utils/request'

//获取运营设置
export function getOperator(data) {
  return request({
    url: '/system/detail_program',
    method: 'post',
    data
  })
}
//保存运营设置
export function setOperator(data) {
  return request({
    url: '/system/save_program',
    method: 'post',
    data
  })
}
// 获取组织列表
export function getOrganizationList(data) {
  return request({
    url: '/admin/meet/list_organize',
    method: 'post',
    data
  })
}
// 获取组织详情
export function getOrganizationDetail(data) {
  return request({
    url: '/admin/meet/detail_organize',
    method: 'post',
    data
  })
}
// 删除组织图
export function changeOrganization(data) {
  return request({
    url: '/admin/meet/operate_organize',
    method: 'post',
    data
  })
}
// 获取组织列表
export function setOrganization(data) {
  return request({
    url: '/admin/meet/save_organize',
    method: 'post',
    data
  })
}
