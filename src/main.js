import Vue from "vue";
import App from "./App.vue";
import store from "./store";

import "firacode";
import "@/plugins/fontawesome.js";

import "@/assets/styles/index.css";
import "highlight.js/styles/tomorrow.css";

import client from "@/database/mongo.js";

Vue.config.productionTip = false;
Vue.prototype.$client = client;

new Vue({
  store,
  render: h => h(App)
}).$mount("#app");
