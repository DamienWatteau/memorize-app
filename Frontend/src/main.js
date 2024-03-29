import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import {ApiUrl} from "./environments"

import axios from "axios"
import VueAxios from 'vue-axios'
axios.defaults.baseURL=ApiUrl;
Vue.use(VueAxios, axios)

import i18n from './i18n'

import Notifications from 'vue-notification'
import vuetify from './plugins/vuetify'
Vue.use(Notifications)

import VuetifyDialog from 'vuetify-dialog'
import 'vuetify-dialog/dist/vuetify-dialog.css'

Vue.use(VuetifyDialog, {
  context: {
    vuetify
  }
})

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
    console.log(error.response)
    if(error.response.statusText == "Unprocessable Entity"){
      if(error.response && error.response.data && error.response.data.errors){
        console.log("aaaa")
        Vue.notify({
          type: "error",
          title: 'Error',
          duration: 10000,
          text: error.response.data.errors.full_messages.join("<br/>")
        })
      }

    }
  }
)


new Vue({
  router,
  store,
  i18n,
  vuetify,
  render: h => h(App)
}).$mount('#app')
