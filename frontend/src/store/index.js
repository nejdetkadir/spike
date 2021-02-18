import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import account from './modules/account'
import quiz from './modules/quiz'

Vue.use(Vuex)

axios.defaults.baseURL = process.env.VUE_APP_BASE_PATH
axios.defaults.withCredentials = true

/* eslint-disable no-new */
const store = new Vuex.Store({
  modules: {
    account,
    quiz
  } 
})

export default async function init() {
  await store.dispatch('account/init')
  return store
}