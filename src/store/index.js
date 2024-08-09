import Vue from 'vue'
import Vuex from 'vuex'
//把它的小弟们都导进来
import app from './modules/app'
import user from './modules/user'
import permission from './modules/permission'
import getters from './getters'
import star from './modules/star'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    user,
    permission,
    star
  },
  getters
})

export default store
