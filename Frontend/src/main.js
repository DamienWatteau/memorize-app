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

import VueSweetalert2 from 'vue-sweetalert2';
import i18n from './i18n'
// import 'sweetalert2/dist/sweetalert2.min.css';
Vue.use(VueSweetalert2);

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'Learning';
  next();
});


new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
