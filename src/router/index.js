import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue'),
    children: [
      {
        path: '/user',
        name: 'User',
        component: () => import('../views/user')
      },
      {
        path: '/order',
        name: 'Order',
        component: () => import('../views/order')
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/login')
  }
]

const router = new VueRouter({
  routes
})

export default router
