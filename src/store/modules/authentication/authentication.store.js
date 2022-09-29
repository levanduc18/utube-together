import actions from "./actions";
import getters from "./getters";
import mutations from "./mutations";

const state = {
  isAuthenticated: false,
  profile: null,
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
