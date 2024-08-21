import Vue from 'vue'
import Router from 'vue-router'
import  NotFound from '../views/404/index.vue'
Vue.use(Router)

// import Layout from '@/views/layout'
// import NotFound from '@/views/404'
export const baseRoutes = [
  {
    path: '/layout',
    // redirect:'/desktop',
    component: ()=>import('../views/layout/index.vue'),
    meta: {
      title: '',
      isLogin: true    //是否需要登录      
    },
    children: [
      {
        path: "desktop",
        name: "desktop",
        component: ()=>import('../views/desktop/index.vue'),
        meta: {
          title: "首页"
        }
      }
    ]
  },
  
  {
    path: '/404',
    name: '404',
    component: NotFound,
    // hidden: true
},

]

export const routes = [
  {
    path: '/login',
    name: 'login',
    component: ()=>import('../views/login/index.vue')
  },
]


const router = new Router({
  mode:'history',
  base: process.env.BASE_URL,
  routes
})


export default router

// export const constantRouterMap = [
//   {
//     path: '/',
//     component: () => import('../views/login/index.vue')
//   },
//   {
//     path: '/login',
//     component: () => import('../views/login/index.vue')
//   },
//   {
//     name: 'layout',
//     path: '/layout',
//     redirect: '/desktop',
//     hidden: true,
//     component: () => import('../views/layout/index.vue'),
//     children: [{
//       path: '',
//       component: () => import('../views/desktop/index.vue')
//     },
//     {
//       path: 'dictionary',
//       component: () => import('../views/dictionary/index.vue')
//     },
//     {
//       path: 'studentsmanage',
//       component: () => import('../views/manage/students.vue')
//     },
//     {
//       path: 'menu',
//       component: () => import('../views/manage/menuManage.vue')
//     },
//     {
//       path: 'star',
//       component: () => import('../views/star/star.vue')
//     },
//     ]
//   },

//   // {
//   //   path: '/404',
//   //   name: '404',
//   //   component: NotFound,
//   //   // hidden: true
//   // },

// ]

// export default new Router({
//   // mode: 'history', //后端支持可开
//   scrollBehavior: () => ({ y: 0 }),
//   routes: constantRouterMap
// })

// // 动态加载菜单
// export const asyncRouterMap = [
//   { path: '*', redirect: '/404', hidden: true }
// ]