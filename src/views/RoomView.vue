<template>
  <div class="room">
    <div class="home_bg-top"></div>
    <div class="room_general-info">
      <div class="button-container">
        <button class="button" @click="isOpenJoinRoomModal = true">
          Join room
        </button>
        <button
          class="button-outline"
          :style="{ marginLeft: '24px' }"
          @click="isOpenCreateRoomModal = true"
        >
          Create new room
        </button>
      </div>
      <div class="divider"></div>
    </div>
    <div class="room-list-container">
      <div class="noRoom" v-if="getRoomList.length == 0">No room now.</div>
      <div
        class="room-item"
        v-else
        v-for="room in getRoomList"
        :key="room?._id"
        @click="handleOpenPasswordModal(room)"
      >
        <img :src="room?.picture" height="50" width="50" class="avatar" />
        <div class="item-info">
          <div class="lh2">Name: {{ room?.name }}</div>
          <div class="lh2">Owner: {{ room?.owner }}</div>
          <div class="lh2">Created: {{ formatDate(room?.createdAt) }}</div>
        </div>
      </div>
    </div>
    <NewRoomModal v-model:isOpen="isOpenCreateRoomModal" />
    <PasswordModal
      v-model:isOpen="isOpenPasswordModal"
      :roomId="this.roomId"
      :name="this.name"
      :owner="this.owner"
      :picture="this.picture"
    />
    <JoinRoomModal v-model:isOpen="isOpenJoinRoomModal" />
  </div>
</template>
<script>
import NewRoomModal from "@/components/rooms/NewRoomModal.vue";
import { mapActions, mapGetters } from "vuex";
import roomApi from "@/api/roomApi.js";
import moment from "moment";
import PasswordModal from "../components/rooms/PasswordModal.vue";
import JoinRoomModal from "../components/rooms/JoinRoomModal.vue";

export default {
  name: "RoomView",
  components: { NewRoomModal, PasswordModal, JoinRoomModal },
  data() {
    return {
      isOpenCreateRoomModal: false,
      isOpenPasswordModal: false,
      roomId: null,
      name: "",
      owner: "",
      picture: "",
      isOpenJoinRoomModal: false,
    };
  },
  computed: {
    ...mapGetters("room", ["getRoomList", "getCurrentRoom"]),
    ...mapGetters("authentication", ["getProfile"]),
    recentUrl() {
      return this.$route?.params?.id;
    },
  },
  methods: {
    ...mapActions("room", ["setRoomList", "setCurrentRoom"]),
    formatDate(data) {
      return moment(data).format("hh:mm A - DD/MM/YYYY");
    },

    handleOpenPasswordModal(room) {
      this.isOpenPasswordModal = true;
      this.roomId = room?._id;
      this.name = room?.name;
      this.owner = room?.owner;
      this.picture = room?.picture;
    },
  },
  async mounted() {
    this.setCurrentRoom(this.recentUrl);
    try {
      const response = await roomApi.getAllRooms();
      this.setRoomList(response);
    } catch (error) {
      this.$notify({
        type: "error",
        text: "Get list of rooms failed",
      });
    }
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/css/variables.scss";
.room {
  width: 100%;
  .home_bg-top {
    position: fixed;
    top: 0;
    width: 100%;
    height: 100vh;
    background-image: url("@/assets/bg-room.jpg");
    background-repeat: no-repeat;
    background-size: cover !important;
    background-position: center center !important;
    filter: brightness(15%);
    z-index: -1;
  }
  .room_general-info {
    padding: 20px 100px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    .button-container {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: start;
      padding: 20px 0;
    }
    .input-container {
      width: 100%;
      padding: 24px 120px;
      padding-bottom: 8px;
      .label {
        min-width: 120px;
        border: 1px rgba(255, 255, 255, 0.2) solid;
        background-color: $dark-color;
        border-right: transparent;
        padding: 12px 16px;
      }
    }
    .info-container {
      text-align: left;
      padding: 12px 120px;
      width: 100%;
    }
  }
  .room-list-container {
    width: 100%;
    padding: 0px 100px 320px 100px;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: center;
    color: rgb(231, 231, 231);
    .room-item {
      flex-basis: 32%;
      transition: all 0.2s ease-in-out;
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 6px;
      border: 1px rgba(255, 255, 255, 0.5) solid;
      background-color: $dark-color;
      padding: 12px;
      cursor: pointer;
      .avatar {
        border-radius: 50%;
      }
      .item-info {
        display: flex;
        flex-direction: column;
        align-items: start;
        margin-left: 16px;
      }
    }
    .room-item:hover {
      background-color: $black-color;
      border: 1px $primary-color solid;
      filter: brightness(120%);
    }
  }
}
</style>
