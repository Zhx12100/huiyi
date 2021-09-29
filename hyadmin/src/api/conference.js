import request from '@/utils/request'

// 获取会议室列表
export function getConferenceList(data) {
  return request({
    url: '/admin/meet/list_meet',
    method: 'post',
    data
  })
}
// 获取会议室详情
export function getConferenceDetail(data) {
  return request({
    url: '/admin/meet/detail_meet',
    method: 'post',
    data
  })
}
// 修改会议室状态
export function changeConference(data) {
  return request({
    url: '/admin/meet/operate_meet',
    method: 'post',
    data
  })
}

// 删除会议室图
export function deleteConference(data) {
  return request({
    url: '/admin/meet/delete_meet',
    method: 'post',
    data
  })
}
// 新增编辑会议室列表
export function setConference(data) {
  return request({
    url: '/admin/meet/save_meet',
    method: 'post',
    data
  })
}

//获取预定详情日历
export function getReserveDate(data) {
  return request({
    url: '/admin/meet/reserve_date',
    method: 'post',
    data
  })
}
//获取预定信息列表
export function getReserveMessage(data) {
  return request({
    url: '/admin/meet/reserve_message',
    method: 'post',
    data
  })
}
//获取预定信息详情
export function getReserveDetail(data) {
  return request({
    url: '/admin/meet/reserve_detail',
    method: 'post',
    data
  })
}
