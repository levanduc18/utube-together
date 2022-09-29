const mutations = {
  updateAuthenticated(state, authenticated) {
    state.isAuthenticated = authenticated;
  },

  updateProfile(state, profile) {
    state.profile = profile;
  },

  resetAuthenticated(state) {
    // reset authenticated
    state.isAuthenticated = false;
    // reset profile
    state.profile = null;
  },
};

export default mutations;
