import request from '@/utils/request'

export function getUserList(data) {
  return request({
    url: '/admin/user/list_wechat',
    method: 'post',
    data
  })
}

export function setFreezeStatus(data) {
  return request({
    url: '/admin/user/wechat/change_status',
    method: 'post',
    data
  })
}


export function setOrganizationId(data) {
  return request({
    url: '/admin/user/change_organize',
    method: 'post',
    data
  })
}

