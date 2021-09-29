import Cookies from 'js-cookie'

const TokenKey = 'vue_admin_template_token'
const UserInfo = 'UserInfo'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getUserInfo() {
  return Cookies.get(UserInfo)
}

export function setUserInfo(token) {
  return Cookies.set(UserInfo, token)
}

export function removeUserInfo() {
  return Cookies.remove(UserInfo)
}

