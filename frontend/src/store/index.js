import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import account from './modules/account'

Vue.use(Vuex)

axios.defaults.baseURL = process.env.VUE_APP_BASE_PATH
axios.defaults.withCredentials = true

/* eslint-disable no-new */
const store = new Vuex.Store({
  modules: {
    account
  } 
})

export default async function init() {
  await store.dispatch('account/init')
  return store
}