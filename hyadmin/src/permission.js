import router from './router'
import Layout from '@/layout'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken, getUserInfo } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login'] // no redirect whitelist

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
// // console.log(router.addRoutes())


router.beforeEach(async (to, from, next) => {
  // start progress bar
  
  NProgress.start()
  console.log(to)
  // set page title
  // document.title = getPageTitle(to.meta.title)

  // determine whether the user has logged in
  const hasToken = getToken()
  if (hasToken) {
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({path:'/'})
      NProgress.done()
    } else {
      // console.log('hasGetUserInfo',hasGetUserInfo)
      const hasGetUserInfo = store.getters.name
      
      // if (hasGetUserInfo) {
      //   next()
      // } else {
      //   try {
      //     // get user info
      //     await store.dispatch('user/getInfo')
      //     next()
      //   } catch (error) {
      //     // remove token and go to login page to re-login
      //     await store.dispatch('user/resetToken')
      //     Message.error(error || 'Has Error')
      //     next(`/login?redirect=${to.path}`)
      //     NProgress.done()
      //   }
      // }
      const hasUserInfo = store.getters.info
      console.log(1,hasUserInfo)
      
      if (!hasUserInfo) {
        store.dispatch('user/GenerateRoutes').then(() => { // 生成可访问的路由表
          // return false
          // router.resetRouter()
          console.log(store.getters.addRouters)
          router.options.routes = store.getters.addRouters
          // router.options.routes = router.options.routes.concat(store.getters.addRouters)
          router.resetRouter()
          router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
          next({ ...to, replace: true }) // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
        })
      } else {
        next() //当有用户权限的时候，说明所有可访问路由已生成 如访问没权限的全面会自动进入404页面
      }

    }
  } else {
    /* has no token*/

    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
