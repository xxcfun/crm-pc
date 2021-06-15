import Vue from 'vue'
import Vuex from 'vuex'
import * as types from './mutation-types'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
    }
  },
  mutations: {
    /**
     * 设置用户信息
     * @param state
     * @param user
     */
    [types.UPDATE_USER_INFO] (state, { user }) {
      state.user = {
        ...state.user,
        ...user
      }
    },
    [types.DELETE_USER_INFO] (state) {
      state.user = {}
    }
  },
  actions: {
  },
  modules: {
  }
})
