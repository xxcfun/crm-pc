import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import mutations from './mutations'

Vue.use(Vuex)

import cookie from '../utils/cookie'

const userInfo = {
  name: cookie.getCookie('name') || '',
  token: cookie.getCookie('token') || ''
}

const state = {
  userInfo
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})
