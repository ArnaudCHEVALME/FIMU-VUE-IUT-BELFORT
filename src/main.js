import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'

Vue.config.productionTip = false
// eslint-disable-next-line
router.beforeEach((to, from, next) => {
  if (!store.getters.isLoggedIn && to.name !== 'Login' && from.name!=="Login") {
    next({ name: 'Login' })
  } else {
    next()
  }
})

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
