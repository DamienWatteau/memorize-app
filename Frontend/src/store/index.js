import Vue from 'vue'
import Vuex from 'vuex'
import playlists from './modules/playlists'
import users from './modules/users'
import quizz from './modules/quizz'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    playlists,
    users,
    quizz
  }
});
