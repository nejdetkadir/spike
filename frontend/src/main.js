import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vuelidate from "vuelidate"

Vue.config.productionTip = false
Vue.use(Vuelidate)

async function main() {
  let storeInstance = await store()

  new Vue({
    router: router(storeInstance),
    store: storeInstance,
    render: h => h(App)
  }).$mount('#app')
}

main()
