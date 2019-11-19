import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/login',
    name: 'login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
  },
  {
    path: '/ask',
    name: 'ask',
    component: () => import(/* webpackChunkName: 'ask' */ '../views/Ask.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import(/* webpackChunkName: 'register' */ '../views/Register.vue')
  },
  {
    path: '/detail/:id',
    name: 'detail',
    component: () => import(/* webpackChunkName: 'details' */ '../views/Detail.vue')
  },
  {
    path: '/tag/:name',
    name: 'tag',
    component: () => import(/* webpackChunkName: 'tag' */ '../views/FindTag.vue')
  },
  {
    path: '/search/:name',
    name: 'search',
    component: () => import(/* webpackChunkName: 'search' */ '../views/Search.vue')
  },
  {
    path: '/rating',
    name: 'rating',
    component: () => import(/* webpackChunkName: 'rating' */ '../views/Rating.vue')
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import(/* webpackChunkName: 'profile' */ '../views/Profile.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
