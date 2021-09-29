import request from '@/utils/request'

//反馈列表
export function getFeedbackList(data) {
  return request({
    url: '/admin/user/list_feedback',
    method: 'post',
    data
  })
}
//反馈详情
export function getFeedbackDetail(data) {
  return request({
    url: '/admin/user/detail_feedback',
    method: 'post',
    data
  })
}


