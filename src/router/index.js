import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: '济南控创电子科技有限公司客户关系管理系统'
    }
  }
]

const router = new VueRouter({
  routes
})

export default router
