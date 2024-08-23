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
Vue.directive('permission', {
  //会在指令作用的元素插入dom之后执行
  inserted(el, binding) {
    //el是当前指令作用的dom元素的对象
    //binding是v-permission=“表达式” 表达式的信息
    const points = JSON.parse(localStorage.getItem('perm')) || []
    // console.log(JSON.parse(localStorage.getItem('perm')),'points');
    // console.log(binding.value,'binding');

    //判断points中是否包含v-permission=“表达式” 表达式的值
    // 131
    if (!points.includes(binding.value)) {
      //禁用或者删除
      if (binding.value === 'topic:day:query' || binding.value === 'user:student:query' || binding.value === 'user:student:ban' || binding.value === 'user:teacher:query' || binding.value === 'user:teacher:ban' || binding.value === 'right:menu:query' || binding.value === 'article:query' || binding.value === 'star:user:query') {
        el.disabled = true
      } else {
        el.remove()
      }
    }
  }
})
// 获取input焦点
Vue.directive('focus', {
  inserted: function (el) {
    el.focus()
  }
})

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
