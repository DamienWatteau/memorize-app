import axios from 'axios'
import router from "@/router/index"
import Vue from 'vue'

/* eslint-disable */
export default {
  state: {
    playlists: [],
    playlist: null
  },
  getters: {
    playlists: (state) => state.playlists,
    playlist: (state) => state.playlist,
  },
  mutations: {
    setPlaylists: (state, value) => state.playlists = value,
    setPlaylist: (state, value) => state.playlist = value,
    setWord: (state, value) => {
      state.playlist.words.push(value);
    },
    removeWordByIndex: (state, index) => {
      state.playlist.words.splice(index, 1);
    },
    removeWordById: (state, value) => {
      state.playlist = state.playlist.words.filter(f => f["id"] != value)
    }
  },
  actions: {
    async getPlaylists({commit}){
      axios.get("playlists").then((response) => {
        if (response && response.data)
          commit("setPlaylists", response.data);
      })
    },
    async createPlaylist({commit}, payload){
      axios.post("playlists", payload).then((response) => {
        if (response && response.data){
          commit("setPlaylist", response.data);
          router.push({name: "show_playlist", params: {id: response.data["id"]}})
        }
      })
    },
    async getPlaylist({commit}, payload){
      axios.get(`playlists/${payload["id"]}`).then((response) => {
        if (response.data)
          commit("setPlaylist", response.data);
      })
    },
    async deletePlaylist({dispatch}, payload){
      axios.delete(`playlists/${payload["id"]}`).then((response) => {
        if(response.status == 200){
          dispatch("getPlaylists");
        }
      })
    },
    async removeWord({commit}, payload){
      axios.delete(`playlists/${payload["playlist_id"]}/words/${payload["id"]}`).then((response) => {
        if(response.status == 200){
          commit("removeWordById", payload["id"]);
        }
      })
    },
    async savePlaylist({state, commit}, payload){
      axios.put(`playlists/${payload["id"]}`, state.playlist).then((response) => {
        if(response.status == 200){
          commit("setPlaylist", response.data);
          console.log(this.app);
          Vue.notify({
            title: 'Success'
          })
        }
      })
    },
  },
}
