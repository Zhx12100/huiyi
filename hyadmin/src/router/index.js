import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
//如首页和登录页和一些不用权限的公用页面
export const constantRouterMap = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  // { path: '*', redirect: '/404', hidden: true }
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    meta: {  role: ['A', 'super_editor'] },
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/index'),
        meta: { title: '用户列表', icon: 'el-icon-user'},
      }
    ]
  },
]

export const asyncRouterMap = [

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    meta: {  role: ['A', 'super_editor'] },
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/index'),
        meta: { title: '用户列表', icon: 'el-icon-user'},
      }
    ]
  },
  {
    path: '/organization',
    component: Layout,
    redirect: '/organization/List',
    name: 'Organization',
    alwaysShow: true,
    meta: { title: '组织管理', icon: 'el-icon-set-up', role: ['B', 'super_editor'] },
    children: [
      {
        path: 'List',
        component: () => import('@/views/organization/List'),
        name: 'OrganizationList',
        hidden: false,
        meta: { title: '组织列表' }
      },
      {
        path: 'Detail',
        component: () => import('@/views/organization/Detail'),
        name: 'OrganizationDetail',
        hidden: true,
        meta: { title: query => { return query.id ? '编辑' : '新增' } }
      }
    ]
  },
  {
    path: '/conference',
    component: Layout,
    redirect: '/conference/List',
    name: 'Conference',
    alwaysShow: true,
    meta: { title: '会议室管理', icon: 'el-icon-monitor', role: ['C', 'super_editor'] },
    children: [
      {
        path: 'List',
        component: () => import('@/views/conference/List'),
        name: 'ConferenceList',
        // hidden: true,
        meta: { title: '会议室列表' },
      },
      {
        path: 'Detail',
        component: () => import('@/views/conference/Detail'),
        name: 'ConferenceDetail',
        hidden: true,
        meta: { title: query => { return query.id ? '编辑' : '新增' } }
      }
    ]
  },
  {
    path: '/audit',
    component: Layout,
    redirect: '/audit/auditList',
    name: 'Audit',
    meta: { role: ['D', 'super_editor']  },
    children: [
      {
        path: 'auditList',
        name: 'AuditList',
        component: () => import('@/views/audit/auditList'),
        meta: { title: '审核管理', icon: 'el-icon-warning-outline'}
      }
    ]
  },
  {
    path: '/feedback',
    component: Layout,
    redirect: '/feedback/feedbackList',
    name: 'Feedback',
    meta: {  role: ['E', 'super_editor'] },
    children: [
      {
        path: 'feedbackList',
        name: 'FeedbackList',
        component: () => import('@/views/feedback/feedbackList'),
        meta: { title: '反馈管理', icon: 'el-icon-phone-outline'}
      }
    ]
  },

  {
    path: '/backstage',
    component: Layout,
    redirect: '/backstage/accountList',
    name: 'Backstage',
    alwaysShow: true,
    meta: { title: '账号管理', icon: 'el-icon-document-copy', role: ['F', 'super_editor'] },
    children: [
      {
        path: 'accountList',
        component: () => import('@/views/backstage/account'),
        name: 'AccountList',
        hidden: false,
        meta: { title: '账号列表' }
      },
      {
        path: 'accountDetail',
        component: () => import('@/views/backstage/accountDetail'),
        name: 'AccountDetail',
        hidden: true,
        meta: { title: query => { return query.id ? '编辑' : '新增' } }
      }
    ]
  },
  {
    path: '/role',
    component: Layout,
    redirect: '/role/roleList',
    name: 'role',
    alwaysShow:true,
    meta: { title: '角色管理', icon: 'el-icon-coordinate', role: ['G', 'super_editor'] },
    children: [
      {
        path: 'roleList',
        name: 'RoleList',
        component: () => import('@/views/role/role'),
        hidden: false,
        meta: { title: '角色列表' },
      },
      {
        path: 'roleDetail',
        component: () => import('@/views/role/roleDetail'),
        name: 'RoleDetail',
        hidden: true,
        meta: { title: query => { return query.id ? '编辑' : '新增' } }
      },
    ]
  }
  
]

// router.selfaddRoutes = function (params){
//   router.matcher = new Router().matcher;
//   router.addRoutes(params)
// }

// export default new Router({
//   routes: constantRouterMap
// });

//实例化vue的时候只挂载constantRouterMap
const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
router.resetRouter = function() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router


