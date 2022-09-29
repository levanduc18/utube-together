import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import "@/assets/css/main.scss";
import "@/assets/css/reset.scss";
import Notifications from "@kyvg/vue3-notification";
import VueSocketIO from "vue-3-socket.io";
import SocketIO from "socket.io-client";
import YoutubeIframe from "@techassi/vue-youtube-iframe";
/* import the fontawesome core */
import { library } from "@fortawesome/fontawesome-svg-core";
import PerfectScrollbar from "vue3-perfect-scrollbar";
import "vue3-perfect-scrollbar/dist/vue3-perfect-scrollbar.css";
/* import font awesome icon component */
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

/* import specific icons */
import { fas } from "@fortawesome/free-solid-svg-icons";

/* add icons to the library */
library.add(fas);

createApp(App)
  .component("font-awesome-icon", FontAwesomeIcon)
  .use(Notifications)
  .use(
    new VueSocketIO({
      debug: true,
      connection: SocketIO(process.env.VUE_APP_API_URL),
    })
  )
  .use(YoutubeIframe)
  .use(PerfectScrollbar)
  .use(store)
  .use(router)
  .mount("#app");
