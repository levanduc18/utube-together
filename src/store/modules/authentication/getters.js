const getters = {
  getProfile: (state) => {
    return state.profile;
  },

  getAuthenticated: (state) => {
    return state.isAuthenticated;
  },
};

export default getters;
