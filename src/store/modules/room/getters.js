const getters = {
  getRoomList: (state) => {
    return state.roomList;
  },

  getCurrentRoom: (state) => {
    return state.currentRoom;
  },

  getIsEnterPassword: (state) => {
    return state.isEnterPassword;
  },

  getCurrentUsersEnterRoom: (state) => {
    return state.currentUsersEnterRoom;
  },
};

export default getters;
