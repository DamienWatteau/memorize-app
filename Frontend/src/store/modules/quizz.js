import axios from 'axios'

/* eslint-disable */
export default {
  state: {
    quizz: [],
  },
  getters: {
    quizz: (state) => state.quizz,
    currentWord: (state) => state.quizz.find(f => f["valid"] == undefined) || {},
    numberOfValidWords: (state) => state.quizz.filter(f => f["valid"] == true).length,
    numberOfWrongWords: (state) => state.quizz.filter(f => f["valid"] == false).length,
    numberOfWordsTreated: (state) => state.quizz.filter(f => f["valid"] != undefined).length
  },
  mutations: {
    setQuizz: (state, value) => state.quizz = value,
    updateWord: (state, value) => {
      let index = state.quizz.findIndex(f => f["id"] == value["id"])
      state.quizz.splice(index, 1, value)
    }
  },
  actions: {
    async getQuizz({commit}){
      axios.get("quizz").then((response) => {
        if (response && response.data)
          commit("setQuizz", response.data);
      })
    },
    async setWordStatus({commit}, payload){
      commit("updateWord", payload);
    },
  },
}
