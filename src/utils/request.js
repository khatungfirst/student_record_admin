
import axios from 'axios'
import { Message } from 'element-ui' // MessageBox
import store from '../store'
import { getToken } from '@/utils/auth'

import {baseURL} from '../../configs/index'
// 创建axios实例，将来对创建出来的实例，进行自定义配置；；不会污染原始的axios实例
const service = axios.create({
  // baseURL: 'http://127.0.0.1:4523/m1/4869431-0-default',http://8.154.36.180:8903
  baseURL: process.env.BASE_URL,
  // baseURL: process.env.NODE_ENV === 'production' ? 'http://8.154.36.180:8903' : process.env.NODE_ENV === 'development' ? "http://192.168.10.7:8881":'/api',
  // baseURL: process.env.NODE_ENV === 'production' ? 'http://8.154.36.180:8903' :"http://192.168.10.7:8881",
  timeout: 15000
})
console.log("---->|||",process.env.BASE_URL)

// 添加请求拦截器
service.interceptors.request.use(config => {
  // Message({
  //   // message: '加载中.....',
  //   forbidClick: true,
  //   loadingType: 'spinner',
  //   duration: 0
  // })
  if (sessionStorage.getItem('token')) {
    config.headers['token'] = getToken() || sessionStorage.getItem('token')
  }
  
  return config
}, error => {
  Promise.reject(error)
})

// 添加响应拦截器
service.interceptors.response.use(
  response => {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么 (默认axios会多包装一层data，需要响应拦截器中处理一下)
    const res = response.data
    if (res.status !== 200 && res.msg !== null && res.msg !== '操作成功' && res.msg !== '') {
      // 给错误提示, Toast 默认是单例模式，后面的 Toast调用了，会将前一个 Toast 效果覆盖
      // 同时只能存在一个 Toast
      Message(res.msg)
      // 抛出一个错误的promise,阻止往下走
      // return Promise.reject(res.msg)
    } 
    return res
  },
  error => {
    // console.log('http error: ', error)
    // // http协议错误
    // Message({
    //   message: error.message,
    //   type: 'error',
    //   duration: 5 * 1000
    // })
    return Promise.reject(error)
  }
)

export default service
