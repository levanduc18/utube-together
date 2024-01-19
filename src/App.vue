<template>
  <div class="header"><TheHeader /></div>
  <div class="content">
    <router-view />
    <scroll-to-top />
    <notifications position="bottom center" />
  </div>
  <div class="footer"><TheFooter /></div>
</template>

<script>
import TheHeader from "./components/commons/TheHeader.vue";
import ScrollToTop from "./components/commons/ScrollToTop.vue";
import { mapActions, mapGetters } from "vuex";
import authApi from "./api/authApi";
import TheFooter from "./components/commons/TheFooter.vue";

export default {
  name: "App",
  components: { TheHeader, ScrollToTop, TheFooter },
  computed: {
    ...mapGetters("authentication", ["getAuthenticated", "getProfile"]),
    ...mapGetters("room", [
      "getRoomList",
      "getCurrentRoom",
      "getCurrentUsersEnterRoom",
    ]),
  },
  async beforeCreate() {
    try {
      await authApi.getAuthenticated();
      this.loginWithGoogle({ isAuthenticated: true });
    } catch (error) {
      this.loginWithGoogle({ isAuthenticated: false });
    }
  },
  async mounted() {
    if (this.getAuthenticated) {
      const response = await authApi.getProfile();
      const { id, name, email, avatar } = response;
      this.setProfile({ id, name, email, avatar });
    }
  },
  methods: {
    ...mapActions("authentication", ["setProfile", "loginWithGoogle"]),
    ...mapActions("room", [
      "setRoomList",
      "setCurrentRoom",
      "setIsEnterPassword",
      "setCurrentUsersEnterRoom",
    ]),
  },
  watch: {
    async getAuthenticated() {
      if (this.getAuthenticated) {
        const response = await authApi.getProfile();
        const { id, name, email, avatar } = response;
        this.setProfile({ id, name, email, avatar });
      }
    },
  },
  sockets: {
    error: function (data) {
      this.$notify({
        type: "error",
        text: data,
      });
    },
    createdRoom: function (data) {
      let cloneRoomList = [data, ...this.getRoomList];
      this.setRoomList(cloneRoomList);
    },
    changedVideoUrl: function (data) {
      this.$notify({
        type: "info",
        text: data.user + " has just changed video url",
      });
    },
    clientdisconnecting: function () {
      this.$socket.emit("leaveRoom", {
        name: this.getProfile?.name,
        room: this.getCurrentRoom,
      });
    },
    joinedRoom: async function (data) {
      this.setIsEnterPassword(true);
      this.$notify({
        type: "info",
        text: `${data.user} has just joined this room`,
      });
      let users = [...this.getCurrentUsersEnterRoom];
      users.push(data.user);
      this.setCurrentUsersEnterRoom(users);
    },
    leavedRoom: function (data) {
      this.$notify({
        type: "error",
        text: `${data.user} has just left this room!`,
      });
    },
  },
};
</script>
