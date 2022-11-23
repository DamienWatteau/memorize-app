import axios from 'axios'

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
  },
  actions: {
    async getPlaylists({commit}){
      axios.get("playlists").then((response) => {
        if (response && response.data)
          commit("setPlaylists", response.data);
      })
    },
    async createPlaylist({}, payload){
      axios.post("playlists", payload)
    },
    async getPlaylist({commit}, payload){
      console.log("aaa")
      axios.get("playlists", payload["id"]).then((response) => {
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
  },
}
