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
};

export default mutations;
