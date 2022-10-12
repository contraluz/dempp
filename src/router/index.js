import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/aboutt',
    name: 'aboutt',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutViewt.vue')
  },
  {
    path: '/waves',
    name: 'waves',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/waves.vue')
  },
  {
    path: '/403',
    name: 'NotAccess',
    component: () => import(/* webpackChunkName: "NotAccess" */ '../views/403.vue')
  }
]

const router = new VueRouter({
  routes
})
// const a = ["about", "aboutt"]
const a = ["home", "about", "waves"]
router.beforeEach((to, from, next) => {
  console.log(a, to.name)
  if (to.name !== 'NotAccess' && !a.includes(to.name)) {
    console.log("无权，403")
    next({ name: 'NotAccess' })
  } else {
    console.log("继续")
    next()
  }
})
export default router
