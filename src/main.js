import Vue from "vue";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import router from "./router";
import App from "./App.vue";
import store from "./store";
import LemonIMUI from 'lemon-imui';
import 'lemon-imui/dist/index.css';
import 'font-awesome/css/font-awesome.min.css'

Vue.use(LemonIMUI);
Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.filter('ellipsis', (value, length=50) => {
  if (!value) return "";
      if (value.length > length) {
        return value.slice(0, length) + "...";
      }
      return value;
})
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
