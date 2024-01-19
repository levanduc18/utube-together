const mutations = {
  updateRoomList(state, roomList) {
    state.roomList = roomList;
  },
  updateCurrentRoom(state, room) {
    state.currentRoom = room;
  },
  updateIsEnterPassword(state, isEnterPassword) {
    state.isEnterPassword = isEnterPassword;
  },
  updateCurrentUsersEnterRoom(state, currentUsers) {
    state.currentUsersEnterRoom = currentUsers;
  },
};

export default mutations;
