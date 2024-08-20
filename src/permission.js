// import router from './router'
// import store from './store'
// import NProgress from 'nprogress' // Progress 进度条
// import 'nprogress/nprogress.css'// Progress 进度条样式
// import { Message } from 'element-ui'
// import { getToken } from '@/utils/auth' // 验权

// // // permissiom judge
// // function hasPermission(roles, permissionRoles) {
// //   if (roles.indexOf('admin') >= 0) return true // admin权限 直接通过
// //   if (!permissionRoles) return true
// //   return roles.some(role => permissionRoles.indexOf(role) >= 0)
// // }

// // // register global progress.
// const whiteList = ['/login', '/authredirect']// 不重定向白名单

// console.log(router,'router');

// router.beforeEach((to, from, next) => {
//   NProgress.start() // 开启Progress
//   if (getToken()) { // 判断是否有token
//     if (to.path === '/login') {
//       next({ path: '/' })
//       NProgress.done() // router在hash模式下 手动改变hash 重定向回来 不会触发afterEach 暂时hack方案 ps：history模式下无问题，可删除该行！
//     } else {
//     //   console.log('from', from)
//     //   console.log('to', to)

//       if (JSON.parse(localStorage.getItem('userInfo')).role.length === 0) { // 判断当前用户是否已拉取完user_info信息
//         console.log('用户是否已拉取完user_info信息', store.getters.roles)
//         store.dispatch('GetInfo').then(res => { // 拉取user_info
//           console.log('GetInfo', res)
//           var roles = JSON.parse(localStorage.getItem('userInfo'))
//           console.log('roles', roles)
//           store.dispatch('GenerateRoutes', { roles }).then(() => { // 生成可访问的路由表
//             router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
//             console.log('getters.addRouters', store.getters.addRouters)
//             next({ ...to }) // hack方法 确保addRoutes已完成
//           })
//         }).catch(() => {
//           store.dispatch('FedLogOut').then(() => {
//             Message.error('验证失败,请重新登录')
//             next({ path: '/login' })
//           })
//         })
//       } else {
//         // 没有动态改变权限的需求可直接next() 删除下方权限判断 ↓
//         console.log('没有动态改变权限的需求可直接next() 删除下方权限判断 ↓', store.getters.roles, to.meta.role)
//         // hasPermission(JSON.parse(localStorage.getItem('userInfo')),
//         if ( to.meta.role) {
//         //   console.log('hasPermission roles', store.getters.roles)
//           next()
//         } else {
//           next({ path: '/404', query: { noGoBack: true }})
//           NProgress.done() // router在hash模式下 手动改变hash 重定向回来 不会触发afterEach 暂时hack方案 ps：history模式下无问题，可删除该行！
//         }
//         // 可删 ↑
//       }
//     }
//   } else {
//     if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
//       next()
//     } else {
//       next('/login') // 否则全部重定向到登录页
//       NProgress.done() // router在hash模式下 手动改变hash 重定向回来 不会触发afterEach 暂时hack方案 ps：history模式下无问题，可删除该行！
//     }
//   }
// })

// router.afterEach(() => {
//   NProgress.done() // 结束Progress
// })

import router from '@/router'
import store from '@/store'
router.beforeEach((to, from, next) => {
    //首先判断进入的路由界面是否需要登录   不登陆直接进入
    // if (to.matched.length == 0 || to.matched.some(ele => ele.meta.isLogin)) {
    // debugger
        if (1) {
            if (0) {
                next()
            } else {     
                store.dispatch('menu/getMenuList').then(mybaseRoutes => {          
                    router.addRoutes(mybaseRoutes);                   
                })
                next()
                
            }
        } else {
            next('/login')
        }
    // } else {
    //     //不需要登录
    //     next()
    // }
})