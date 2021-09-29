import request from '@/utils/request'


//用户列表
export function getAccountList(data) {
  return request({
    url: '/admin/user/list_user',
    method: 'post',
    data
  })
}

// 新增编辑用户账号
export function setAccount(data) {
  return request({
    url: '/admin/user/save_user',
    method: 'post',
    data
  })
}

// 获取账号信息
export function getAccount(data) {
  return request({
    url: '/admin/user/detail_user',
    method: 'post',
    data
  })
}

// 删除用户账号
export function deleteAccount(data) {
  return request({
    url: '/admin/user/delete_user',
    method: 'post',
    data
  })
}

// 改变账号状态
export function setFreeze(data) {
  return request({
    url: '/admin/user/change_status',
    method: 'post',
    data
  })
}



// 角色选择列表
export function getRoleList(data) {
  return request({
    url: '/admin/user/select_role',
    method: 'post',
    data
  })
}


//角色列表
export function getRoleLists(data) {
  return request({
    url: '/admin/user/list_role',
    method: 'post',
    data
  })
}

// 新增编辑角色账号
export function setRole(data) {
  return request({
    url: '/admin/user/save_role',
    method: 'post',
    data
  })
}

// 获取账号信息
export function getRole(data) {
  return request({
    url: '/admin/user/detail_role',
    method: 'post',
    data
  })
}

// 删除角色账号
export function deleteRole(data) {
  return request({
    url: '/admin/user/delete_role',
    method: 'post',
    data
  })
}


