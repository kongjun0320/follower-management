import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: () => import('../views/Home.vue'),
    children: [
      {
        path: '/',
        redirect: '/user'
      },
      {
        path: 'user',
        name: 'User',
        component: () => import('../views/user')
      },
      {
        path: 'order',
        name: 'Order',
        component: () => import('../views/order')
      },
      {
        path: 'product',
        name: 'Product',
        component: () => import('../views/product')
      },
      {
        path: 'category',
        name: 'Category',
        component: () => import('../views/category')
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/login')
  },
  {
    path: '*',
    redirect: '/login'
  }
]

const router = new VueRouter({
  routes
})

export default router
