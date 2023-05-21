export default {
  namespaced: true,
  state: {
    isLogined: localStorage.getItem("avatar") || false,
  },
  mutations: {
    setIsLogined(state, payload) {
      state.isLogined = payload;
    },
  },
  actions: {},
};
