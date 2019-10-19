import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'LoginRegister',
      component: () => import(/* webpackChunkName: "loginRegister" */ './views/LoginRegister.vue')
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/admin',
      name: 'Admin',
      component: () => import(/* webpackChunkName: "Admin" */ './views/Admin.vue'),
      children: [
        {
          path: ':id',
          component: () => import(/* webpackChunkName: "Admin" */ './components/ItemDetail.vue')
        }
      ]
    }
  ]
})
