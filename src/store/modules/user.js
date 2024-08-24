import { login, logout, getInfo } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'

const user = {
  namespaced: true,
  state: {
    token: getToken(),
    name: '',
    userInfo: {},
    permission:[]
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token

    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_USERINFO: (state, userinfo) => {
      state.userInfo = userinfo
    },
    SET_PERMISSION:(state,perm) => { 
      state.permission = perm
      console.log(perm,'permmmmm');
      
    }
  },

  actions: {
    // 将token存入
    tokenIn(store,context) {
      sessionStorage.setItem('token',JSON.stringify(context))    
      setToken(JSON.parse(sessionStorage.getItem('token')))
      store.commit('SET_TOKEN', JSON.parse(sessionStorage.getItem('token')))
    },

    //将登录用户的身份和username存入
    userInfo(store,context){
      localStorage.setItem('userInfo', JSON.stringify(context));//将用户信息存到本地
      console.log(JSON.parse(localStorage.getItem('userInfo')),'777');
      store.commit('SET_USERINFO',JSON.parse(localStorage.getItem('userInfo')))
    },


    //将用户的权限存入
    permissionInto(store,context){
      localStorage.setItem('perm', JSON.stringify(context));
      store.commit('SET_PERMISSION',JSON.parse(localStorage.getItem('perm')))
    },

    // 登出
    LogOut(store) {
      // 将token置为空
      store.commit('SET_TOKEN', '')
      store.commit('SET_USERINFO', {})
      removeToken()
      // sessionStorage.removeItem('token')
      localStorage.removeItem('userInfo')
      localStorage.removeItem('perm')
    },

     // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }

  },

  getters: {  
    // 定义一个 getter 来获取用户的角色  
    roles: state => state.userInfo.roles  
  }  
}

export default user

