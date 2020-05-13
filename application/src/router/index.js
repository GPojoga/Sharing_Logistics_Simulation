import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/output',
    name: 'OutputPage',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/OutputPage.vue')
  },
  {
    path: '/settings',
    name: 'SettingsPage',
    component: () => import('../views/SettingsPage')
  },
  {
    path: '/sharing',
    name: 'SharingPage',
    component: () => import('../views/SharingPage')
  },
  {
    path: '/traditional',
    name: 'TraditionalPage',
    component: () => import('../views/TraditionalPage')
  }
];

const router = new VueRouter({
  routes
});

export default router
