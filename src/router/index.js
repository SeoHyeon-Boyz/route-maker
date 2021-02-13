import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import RouteSetting from '../views/routeSetting.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/RouteSetting',
    name: 'RouteSetting',
    component: RouteSetting,
    props: true
  }
]

const router = new VueRouter({
  routes
})

export default router
