import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLogined: localStorage.getItem("avatar") ? true : false,
    avatar: localStorage.getItem("avatar") || "",
    balance: localStorage.getItem("balance") || 0,
    user: JSON.parse(localStorage.getItem("user")) || "",
  },
  mutations: {
    setIsLogined(state, payload) {
      state.isLogined = payload;
    },
    setAvatar(state, payload) {
      state.avatar = payload;
    },
    setBalance(state, payload) {
      state.balance = payload;
    },
    setUser(state, payload) {
      state.user = payload;
    }
  },
});
