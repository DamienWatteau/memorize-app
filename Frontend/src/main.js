import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import {ApiUrl} from "./environments"

import axios from "axios"
import VueAxios from 'vue-axios'
axios.defaults.baseURL=ApiUrl;
Vue.use(VueAxios, axios)

import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
Vue.use(Buefy);

import i18n from './i18n'

import Notifications from 'vue-notification'
Vue.use(Notifications)

Vue.config.productionTip = false

axios.interceptors.request.use(
  (config) => {
    if(localStorage.getItem("auth") != undefined){
      config.headers =  JSON.parse(localStorage.getItem("auth"))
    }
    config.headers["Content-Type"] = "application/json";
    return config;
  }
)

axios.interceptors.response.use(
  (response) => {return response;},
  (error) => {
    if(error.response.status == 401 || error.response.status == status.UNAUTHORIZED){
      // Erreur
      store.commit("clearSession");
    }
    if(error.response.status == status.UNPROCESSABLE_ENTITY){
      // Erreur
    }
  }
)


new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
