const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  is_superuser: state => state.user.is_superuser,
  info: state => state.user.info,
  addRouters: state => state.user.addRouters
}
export default getters
