import router from '../../router'
import Layout from '@/layout'
import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken, getUserInfo, setUserInfo, removeUserInfo } from '@/utils/auth'
import { asyncRouterMap, constantRouterMap } from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    info: '',
    name: '',
    avatar: '',
    perm_list:'',
    is_superuser:'',
    routers: constantRouterMap,
    asyncRouterMap:asyncRouterMap,
    addRouters: []
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_INFO: (state, info) => {
    state.info = info
  },
  SET_ISSUPERUSER: (state, is_superuser) => {
    state.is_superuser = is_superuser
  },
  SET_PERMLIST: (state, perm_list) => {
    state.perm_list = perm_list
  },
  SET_ROUTERS: (state, routers) => {
    state.addRouters = routers;
    console.log('routers',routers)
    state.routers = constantRouterMap.concat(routers);
    // router.options.routes = state.routers
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then(response => {
        console.log('登录',response)
        const { data } = response
        commit('SET_TOKEN', data.token)
        commit('SET_NAME', data.username)
        commit('SET_ISSUPERUSER', data.is_superuser)
        commit('SET_PERMLIST', data.perm_list)
        // GenerateRoutes
        // let routeArr = [
        //   {
        //     path: '/',
        //     component: Layout,
        //     redirect: '/dashboard',
        //     meta: {  role: ['A', 'super_editor'] },
        //     children: [
        //       {
        //         path: 'dashboard',
        //         name: 'Dashboard',
        //         component: () => import('@/views/dashboard/index'),
        //         meta: { title: '用户列表', icon: 'el-icon-user'},
        //       }
        //     ]
        //   }
        // ]
        // router.options.routes = routeArr
        // // console.log(router.addRoutes())
        // router.addRoutes(routeArr) // 动态添加可访问路由表
        setToken(data.token)
        setUserInfo(data)
        console.log(getUserInfo())
        resolve()
      }).catch(error => {
        reject(error)
      })-888
    }) 
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const { data } = response
        if (!data) {
          return reject('Verification failed, please Login again.')
        }
        const { name, avatar } = data
        commit('SET_AVATAR', avatar)
        resolve(data) 
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state },data) {
    return new Promise((resolve, reject) => {
      logout(data).then(() => {
        removeToken() // must remove  token  first
        removeUserInfo() // must remove  token  first
        // resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      removeUserInfo() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  },

  GenerateRoutes({ commit,state }) {
    return new Promise(resolve => {
      commit('SET_INFO', JSON.parse(getUserInfo()));
      const roles = JSON.parse(getUserInfo()).perm_list;
      if(JSON.parse(getUserInfo()).is_superuser==true){
        commit('SET_ROUTERS', asyncRouterMap);
        resolve();
      }else{
        const accessedRouters = asyncRouterMap.filter(v => {
          if(roles.indexOf(v.meta.role[0])!=-1){
            return v
          }
          return false;
        });
        commit('SET_ROUTERS', accessedRouters);
        resolve();
      }
    })
  }
}



export default {
  namespaced: true,
  state,
  mutations,
  actions
}

