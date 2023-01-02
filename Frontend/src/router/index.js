import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

import Authentification from '@/views/Authentification.vue'

import ShowPlaylist from '../views/Playlists/Show.vue'

import StartQuizz from '../views/Quizz/Start.vue'

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
    path: '/login',
    name: 'login',
    component: Authentification
  },
  {
    path: '/playlists/:id',
    name: 'show_playlist',
    component: ShowPlaylist,
    meta: {auth: true}
  },
  {
    path: "/quizz",
    name: "quizz",
    component: StartQuizz,
    meta:  {auth: true}
  }
]

const router = new VueRouter({
  mode: "history",
  routes
})

export default router

router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'Memorize';
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
