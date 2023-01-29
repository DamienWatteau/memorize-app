import axios from 'axios'

/* eslint-disable */
export default {
  state: {
    quizz: [],
  },
  getters: {
    quizz: (state) => state.quizz,
    currentWord: (state) => state.quizz.find(f => f["valid"] == undefined) || {},
    validWords: (state) => state.quizz.filter(f => f["valid"] == true),
    wrongWords: (state) => state.quizz.filter(f => f["valid"] == false),
    numberOfWordsTreated: (state) => state.quizz.filter(f => f["valid"] != undefined).length,
  },
  mutations: {
    setQuizz: (state, value) => state.quizz = value,
    updateWord: (state, value) => {
      let index = state.quizz.findIndex(f => f["id"] == value["id"])
      state.quizz.splice(index, 1, value)
    },
    resetWords: (state) => {
      state.quizz = state.quizz.filter(f => f["valid"] == false);
      state.quizz.forEach(f => delete f["valid"])
      state.quizz = state.quizz.map(m => m);
    }
  },
  actions: {
    async getQuizz({commit}, payload){
      axios.get(`quizz?playlist_id=${payload.id}&mode=${payload.mode}&words_option=${payload.words.option}&words_value=${payload.words.value}`).then((response) => {
        if (response && response.data)
          commit("setQuizz", response.data);
      })
    },
    async setWordStatus({commit}, payload){
      commit("updateWord", payload);
    },
    async resetWords({commit}){
      commit("resetWords");
    }
  },
}
