import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import ShowPlaylist from '../views/Playlists/Show.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/playlists/new',
    name: 'Show playlist',
    component: ShowPlaylist
  },
]

const router = new VueRouter({
  routes
})

export default router
