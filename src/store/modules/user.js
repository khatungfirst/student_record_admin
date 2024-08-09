// import { login, logout, getInfo } from '@/api/login'
// import { getToken, setToken, removeToken } from '@/utils/auth'

const user = {
  namespaced: true,
  state: {
    token: '',
    name: '',
    userInfo: {}
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
      localStorage.setItem('token',token)
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_USERINFO: (state, userinfo) => {
      state.userInfo = userinfo
      localStorage.setItem('userInfo', JSON.stringify(userinfo));//将用户信息存到本地
    }
  },

  actions: {
    // 将token存入
    tokenIn(store,context) {
      console.log("111111111",context)
      store.commit('SET_TOKEN', context)
    },

    //将登录用户的身份和username存入
    userInfo(store,context){
      console.log(context,'conetxt');
      store.commit('SET_USERINFO',context)
    },

    // 登出
    LogOut() {
      // 将token置为空
      commit('SET_TOKEN', '')
      localStorage.removeItem('token')
    },

  },

  getters: {  
    // 定义一个 getter 来获取用户的角色  
    roles: state => state.userInfo.roles  
  }  
}

export default user
