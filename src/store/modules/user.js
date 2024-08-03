// import { login, logout, getInfo } from '@/api/login'
// import { getToken, setToken, removeToken } from '@/utils/auth'

const user = {
  namespaced: true,
  state: {
    token: '',
    name: '',
    roles: [],
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
      localStorage.setItem('userInfo', userinfo);//将用户信息存到本地
    }
  },

  actions: {
    // 将token存入
    tokenIn(store,context) {
      store.commit('SET_TOKEN', context)
    },
    // 获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getInfo(state.token).then(response => {
          const data = response.data
          commit('SET_ROLES', data.roles)
          commit('SET_NAME', data.name)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    LogOut() {
      // 将token置为空
      commit('SET_TOKEN', '')
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
  }
}

export default user
