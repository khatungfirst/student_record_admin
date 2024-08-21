import Vue from 'vue'
import 'normalize.css/normalize.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/index.scss' // reset css
import App from './App'
import router from './router'
import store from './store'
import './mock'
import './permission' // permission control
import './debug' // 错误日志收集
import '../static/icon/iconfont.css'
// 在main.js或app.js中  


Vue.use(ElementUI, {
  size: 'small' // default: medium
})

Vue.config.productionTip = false

//注册自定义指令 控制功能权限
Vue.directive('permission',{
  //会在指令作用的元素插入dom之后执行
  inserted(el,binding){
    console.log(el,'el');
    console.log(binding,'binding');
  }
})


new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
