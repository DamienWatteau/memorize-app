import axios from 'axios'
import router from '@/router/index'
import { pick } from "lodash"

/* eslint-disable */
export default {
  state: {
    isLoggedIn: (localStorage.getItem('auth') != undefined) || false,
    user: (localStorage.getItem("user") != undefined ? JSON.parse(localStorage.getItem("user")) : null)
  },
  getters: {
    user: (state) => state.user,
    isLoggedIn: (state) => state.isLoggedIn,
  },
  mutations: {
    clearSession: (state) => {
      state.isLoggedIn = false;
      state.user = null;
      localStorage.clear();
      router.push("/login");
    },
    auth: (state, value) => {
      const autHeaders = pick(value.headers, [
        "access-token",
        "client",
        "expiry",
        "uid",
        "token-type"
      ])
      state.isLoggedIn = true;
      state.user = value.data.user;
      localStorage.setItem('auth', JSON.stringify(autHeaders));
      localStorage.setItem('user', JSON.stringify(state.user));
    },
    setUser: (state, value) => {state.user = value}
  },
  actions: {
    async login({commit}, payload){
      axios.post("/users/sign_in", payload).then((response) => {
        if (response.data){
          localStorage.clear();
          commit("auth", response);
          router.push("/");
        }
      })
    },
    async logout({commit}){
      axios.delete("/users/sign_out").then(() => {
        commit("clearSession");
      })
    },
    async createUser({commit}, payload){
      axios.post("/users", payload).then((response) => {
        if (response.data){
          localStorage.clear();
          commit("auth", response);
          router.push("/");
        }
      })
    },
  },
}
