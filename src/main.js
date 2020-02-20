import Vue from "vue";
import App from "./App.vue";
import store from "./store";

import "firacode";
import "@/plugins/fontawesome.js";


import "@/assets/styles/index.css";
import 'highlight.js/styles/tomorrow.css';

Vue.config.productionTip = false;

new Vue({
  store,
  render: h => h(App)
}).$mount("#app");
