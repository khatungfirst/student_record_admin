import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式

import router from '@/router'
import store from '@/store'

router.beforeEach((to, from, next) => {
  NProgress.start() // 开启Progress
  if (localStorage.getItem('token')) {
      store.dispatch('menu/getMenuList').then(mybaseRoutes => {
          router.addRoutes(mybaseRoutes);    
      }).catch(error => {
          // 获取菜单列表出错，跳转到登录页
          next({ name: 'login' }); // 使用 name 跳转，避免死循环
        });
      next()
      NProgress.done() // 结束Progress
  }else {
      // debugger
      console.log(to,'0000');

      if (to.name === 'login') {
          next(); // 已在登录页，允许导航
        } else {
          next({ name:'login' }); // 使用 name 跳转，避免死循环
        }          
  }

})
router.afterEach(() => {
  NProgress.done() // 结束Progress
})