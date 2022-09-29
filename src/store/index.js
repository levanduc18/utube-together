import Vuex from "vuex";

import createPersistedState from "vuex-persistedstate";

import modules from "./modules";

const debug = process.env.NODE_ENV !== "production";

const authentication_persisted_state = createPersistedState({
  paths: ["authentication"],
});

const store = new Vuex.Store({
  modules,
  strict: debug,
  plugins: [authentication_persisted_state],
});

export default store;
