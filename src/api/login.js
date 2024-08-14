//  此处用于存放登录有关的所有接口
import request from '@/utils/request'

// 1.获取图形验证码
export const getPicCode = () => {
  return request.post('/user/code',)
}

// 2.验证用户输入的信息是否正确并完成登录
export const login = (username, password, verify, verifyId) => {
  const data = JSON.stringify({ username, password, verify, verifyId })
  return request.post('/user/hlogin', data,
    {
      headers: {
        'Content-Type': 'application/json'
      }
    }
  )
}
