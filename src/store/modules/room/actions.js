const actions = {
  setRoomList({ commit }, roomList) {
    if (!roomList) return;
    commit("updateRoomList", roomList);
  },
  setCurrentRoom({ commit }, room) {
    if (!room) return;
    commit("updateCurrentRoom", room);
  },
  setIsEnterPassword({ commit }, isEnterPassword) {
    commit("updateIsEnterPassword", isEnterPassword);
  },
  setCurrentUsersEnterRoom({ commit }, currentUsers) {
    commit("updateCurrentUsersEnterRoom", currentUsers);
  },
};

export default actions;
