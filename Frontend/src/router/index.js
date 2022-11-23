import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import ShowPlaylist from '../views/Playlists/Show.vue'
import Login from '@/views/Login.vue'
import Register from '@/views/Register.vue'

import store from '@/store/index'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: {auth: true}
  },
  {
    path: '/playlists/new',
    name: 'Show playlist',
    component: ShowPlaylist,
    meta: {auth: true}
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
]

const router = new VueRouter({
  mode: "history",
  routes
})

export default router

router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'Learning';
  if(to.matched.some((record) => record.meta.auth)){
    if(store.getters.isLoggedIn){
      next();
      return;
    } else {
      next("/login")
    }
  } else {
    next();
  }
});
