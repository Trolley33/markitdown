import Vue from "vue";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faPlus, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faPlus, faEye, faEyeSlash);

Vue.component('font-awesome-icon', FontAwesomeIcon);