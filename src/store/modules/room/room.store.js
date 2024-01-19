import actions from "./actions";
import getters from "./getters";
import mutations from "./mutations";

const state = {
  roomList: [],
  currentRoom: "",
  isEnterPassword: false,
  currentUsersEnterRoom: [],
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
