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
import {
  faGlobeEurope,
  faEnvelope,
  faMobileAlt
} from "@fortawesome/free-solid-svg-icons";
import "@fortawesome/fontawesome-svg-core/styles.css";
import Vuelidate from "vuelidate";

// import 'prismjs/themes/prism.css'

config.autoAddCss = false;
library.add(
  faGithub,
  faFigma,
  faGlobeEurope,
  faFacebook,
  faLinkedin,
  faFacebookMessenger,
  faEnvelope,
  faMobileAlt
);

export default function(Vue, { router, head, isClient }) {
  // Set default layout as a global component
  Vue.component("Layout", DefaultLayout);
  Vue.component("font-awesome", FontAwesomeIcon);
  Vue.use(Vuelidate);

  // Add a meta tags
  head.meta.push({
    hid: "description",
    name: "description",
    content:
      "Strona poświęcona działalności niedoświadczonego, wiecznie zdumionego programisty."
  });
  head.meta.push({
    name: "keywords",
    content: "vue,gridsome,javascript,frontend,blog,portfolio,node,graphql"
  });
  head.meta.push({ name: "robots", hid: "robots", content: "index, follow" });
  head.meta.push({
    name: "twitter:card",
    content: "https://www.amazeddeveloper.pl/images/og_bgi.jpg"
  });
  head.meta.push({ name: "twitter:site", content: "@AmazedBear" });
  head.meta.push({
    hid: `og:title`,
    property: "og:title",
    content: "AmazedDeveloper.pl"
  });
  head.meta.push({
    hid: `og:url`,
    property: "og:url",
    content: "https://www.amazeddeveloper.pl/"
  });
  head.meta.push({
    hid: `og:image`,
    property: "og:image",
    content: "https://www.amazeddeveloper.pl/images/og_bgi.jpg"
  });
  head.meta.push({
    hid: `og:description`,
    property: "og:description",
    content: "Portfolio i blog wiecznie zdumionego programisty."
  });
  head.meta.push({ name: "theme-color", content: "#333" });
}
