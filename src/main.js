import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element'

Vue.config.productionTip = false

// 设置路由标题
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

window.app = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
