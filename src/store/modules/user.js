import { login, logout, getInfo } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'

const user = {
  namespaced: true,
  state: {
    token: getToken(),
    name: '',
    userInfo: {}
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
    }
  },

  actions: {
    // 将token存入
    tokenIn(store,context) {
      localStorage.setItem('token',JSON.stringify(context))    
      setToken(JSON.parse(localStorage.getItem('token')))
      store.commit('SET_TOKEN', JSON.parse(localStorage.getItem('token')))
    },

    //将登录用户的身份和username存入
    userInfo(store,context){
      localStorage.setItem('userInfo', JSON.stringify(context));//将用户信息存到本地
      console.log(JSON.parse(localStorage.getItem('userInfo')),'777');
      store.commit('SET_USERINFO',JSON.parse(localStorage.getItem('userInfo')))
    },

    // 登出
    LogOut(store) {
      // 将token置为空
      store.commit('SET_TOKEN', '')
      store.commit('SET_USERINFO', {})
      removeToken()
      localStorage.removeItem('token')
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


// import { login, logout, getInfo } from '@/api/login'
// import { getToken, setToken, removeToken } from '@/utils/auth'

// const user = {
//   state: {
//     token: getToken(),
//     name: '',
//     roles: []
//   },

//   mutations: {
//     SET_TOKEN: (state, token) => {
//       state.token = token
//     },
//     SET_NAME: (state, name) => {
//       state.name = name
//     },
//     SET_ROLES: (state, roles) => {
//       state.roles = roles
//     }
//   },

//   actions: {
//     // 登录
//     Login({ commit }, userInfo) {
//       const username = userInfo.username.trim()
//       return new Promise((resolve, reject) => {
//         login(username, userInfo.password).then(response => {
//           const data = response.data
//           setToken(data.token)
//           commit('SET_TOKEN', data.token)
//           resolve()
//         }).catch(error => {
//           reject(error)
//         })
//       })
//     },

//     // 获取用户信息
//     GetInfo({ commit, state }) {
//       return new Promise((resolve, reject) => {
//         getInfo(state.token).then(response => {
//           const data = response.data
//           commit('SET_ROLES', data.roles)
//           commit('SET_NAME', data.name)
//           resolve(response)
//         }).catch(error => {
//           reject(error)
//         })
//       })
//     },

//     // 登出
//     LogOut({ commit, state }) {
//       return new Promise((resolve, reject) => {
//         logout(state.token).then(() => {
//           commit('SET_TOKEN', '')
//           commit('SET_ROLES', [])
//           removeToken()
//           resolve()
//         }).catch(error => {
//           reject(error)
//         })
//       })
//     },

//     // 前端 登出
//     FedLogOut({ commit }) {
//       return new Promise(resolve => {
//         commit('SET_TOKEN', '')
//         removeToken()
//         resolve()
//       })
//     }
//   }
// }

// export default user
