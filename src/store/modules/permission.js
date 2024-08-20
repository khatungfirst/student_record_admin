// import { menuOther, constantRouterMap } from '@/router'
// import Router from '../../router/index'
// import store from '../../store'
// import {menuOther} from '../../router/menuList'
// // /**
// //  * 通过meta.role判断是否与当前用户权限匹配
// //  * @param roles
// //  * @param route
// //  */
// function hasPermission(roles, route) {
//   if (route.meta && route.meta.roles) {
//     return roles.some(role => route.meta.roles.indexOf(role) >= 0)
//   } else {
//     return true
//   }
// }

// /**
//  * 递归过滤异步路由表，返回符合用户角色权限的路由表
//  * @param menuOther
//  * @param roles
//  */
// function filterAsyncRouter(menuOther, roles) {
//   const accessedRouters = menuOther.filter(route => {
//     if (hasPermission(roles, route)) {
//       if (route.children && route.children.length) {
//         route.children = filterAsyncRouter(route.children, roles)
//       }
//       return true
//     }
//     return false
//   })
//   return accessedRouters
// }

// const permission = {
//   state: {
//     routers: constantRouterMap,
//     addRouters: []
//   },
//   mutations: {
//     SET_ROUTERS: (state, routers) => {
//       state.addRouters = routers
//       state.routers = constantRouterMap.concat(routers)
//       console.log('state.routers', state.routers)
//     }
//   },
//   actions: {
//     GenerateRoutes({ commit }, data) {
//       return new Promise(resolve => {
//         const { roles } = data
//         if (roles) {
//           let accessedRouters
//           if (roles.indexOf('admin') >= 0) {
//             accessedRouters = menuOther
//           } else {
//             accessedRouters = filterAsyncRouter(menuOther, roles)
//           }
//           commit('SET_ROUTERS', accessedRouters)
//           resolve()
//         }
//       })
//     }
//   }
// }

// export default permission
