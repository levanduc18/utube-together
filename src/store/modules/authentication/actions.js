const actions = {
  setProfile({ commit }, profile) {
    if (!profile) return;
    commit("updateProfile", profile);
  },

  loginWithGoogle({ commit }, payload) {
    if (!payload) return;
    commit("updateAuthenticated", payload.isAuthenticated);
  },

  logout({ commit }) {
    commit("resetAuthenticated");
  },
};

export default actions;
