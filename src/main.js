// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api

import DefaultLayout from "~/layouts/Default.vue";
import "~/assets/scss/base.scss";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { config, library } from "@fortawesome/fontawesome-svg-core";
import {
  faGithub,
  faFigma,
  faFacebook,
  faLinkedin,
  faFacebookMessenger
} from "@fortawesome/free-brands-svg-icons";
import { faGlobeEurope, faEnvelope, faMobileAlt } from "@fortawesome/free-solid-svg-icons";
import "@fortawesome/fontawesome-svg-core/styles.css";
import Vuelidate from "vuelidate";

// import 'prismjs/themes/prism.css'

config.autoAddCss = false;
library.add(faGithub, faFigma, faGlobeEurope, faFacebook, faLinkedin, faFacebookMessenger, faEnvelope, faMobileAlt);

export default function(Vue, { router, head, isClient }) {
  // Set default layout as a global component
  Vue.component("Layout", DefaultLayout);
  Vue.component("font-awesome", FontAwesomeIcon);
  Vue.use(Vuelidate);
}
