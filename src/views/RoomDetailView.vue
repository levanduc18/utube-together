<template>
  <div class="room">
    <div class="home_bg-top"></div>
    <div class="room_general-info">
      <div class="container" :style="{ justifyContent: 'center' }">
        <img
          :src="roomPicture"
          height="64"
          width="64"
          :style="{ borderRadius: '50%', marginLeft: '32px' }"
        />
        <div class="info-container">
          <div class="label">Name: {{ roomName }}</div>
          <div class="label mt8">Owner: {{ roomOwner }}</div>
          <div class="label mt8">Created: {{ formatDate(createdAt) }}</div>
        </div>
        <div>
          <font-awesome-icon
            :icon="['fas', 'share']"
            class="button-icon"
            @click="copyURL()"
          />

          <font-awesome-icon
            :icon="['fas', 'trash']"
            class="button-icon"
            @click="handleDelete()"
          />
        </div>
      </div>
      <div class="input-container">
        <div class="label">Youtube URL</div>
        <input
          class="input"
          v-model="linkVideo"
          :style="{ padding: '12px 16px' }"
          @keyup.enter="handleChangeURL()"
          placeholder="Enter your youtube url"
          autocomplete="new-password"
        />
        <button class="button" @click="handleChangeURL()">Confirm</button>
      </div>
      <div
        v-if="!isYoutubeLink && linkVideo.length != 0"
        :style="{ color: 'red' }"
      >
        Please enter with valid format of youtube link.
      </div>
    </div>
    <div class="video-container">
      <youtube-iframe
        :video-id="videoId"
        :player-width="720"
        :player-height="480"
        @state-change="stateChange"
        :key="videoId"
        ref="yt"
        v-if="videoId.length > 0"
      ></youtube-iframe>
      <div v-else class="paddingB">Please enter video url and confirm it!</div>
      <div class="chat-container">
        <perfect-scrollbar class="message-container" id="messageList">
          <div
            class="message-item"
            v-for="(message, index) in messageList"
            :key="index"
          >
            <img
              :src="message.avatar"
              height="24"
              width="24"
              :style="{ borderRadius: '50%' }"
            />

            <div class="username">{{ message.user }}</div>
            <div class="item">
              {{ message.message }}
            </div>
          </div>
        </perfect-scrollbar>

        <div class="input-container">
          <input
            class="input"
            v-model="message"
            ref="inputMessage"
            placeholder="Enter the message..."
            autocomplete="new-password"
            id="inputMessage"
            @keyup.enter="handleSendMessage()"
          />
        </div>
      </div>
    </div>

    <PasswordModal
      v-model:isOpen="isOpenPasswordModal"
      :roomId="this.getCurrentRoom"
      :name="this.roomName"
      :owner="this.roomOwner"
      :picture="this.roomPicture"
    />
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import roomApi from "@/api/roomApi.js";
import moment from "moment";
import PasswordModal from "@/components/rooms/PasswordModal.vue";

export default {
  name: "RoomDetailView",
  components: { PasswordModal },
  data() {
    return {
      linkVideo: "",
      roomName: "",
      roomOwner: "",
      roomPicture: "",
      createdAt: "",
      currentVideoUrl: "",
      videoId: "",
      isYoutubeLink: false,
      isOpenPasswordModal: false,
      player: null,
      changer: null,
      currentStatus: null,
      ownerId: null,
      message: "",
      messageList: [],
      currentUserChange: null,
      anotherEmit: false,
      previousChanger: null,
      enableByMe: null,
    };
  },
  computed: {
    ...mapGetters("room", ["getRoomList", "getCurrentRoom"]),
    ...mapGetters("authentication", ["getProfile", "getIsEnterPassword"]),

    recentUrl() {
      return this.$route?.params?.id;
    },
  },
  methods: {
    ...mapActions("room", ["setRoomList", "setCurrentRoom"]),
    handleSendMessage() {
      if (this.message != "")
        this.$socket.emit("sendMessage", {
          user: this.getProfile?.name,
          message: this.message,
          avatar: this.getProfile?.avatar,
          createdAt: new Date(),
          room: this.getCurrentRoom,
        });
      this.message = "";
    },
    async copyURL() {
      try {
        await navigator.clipboard.writeText(window.location.href);
        this.$notify({
          type: "info",
          text: "Copied link!",
        });
      } catch (e) {
        this.$notify({
          type: "error",
          text: "Failed to copy link!",
        });
      }
    },
    formatDate(data) {
      return moment(data).format("hh:mm A - DD/MM/YYYY");
    },

    stateChange(e) {
      const videoState = e.target.playerInfo.playerState;
      const currentTime = e.target.getCurrentTime();
      this.currentStatus = videoState;
      if ([0, 1, 2].includes(this.currentStatus)) {
        if (this.getProfile?.id != this.changer) {
          this.changer = this.getProfile?.id;
        } else {
          this.$socket.emit("videoChangeState", {
            room: this.getCurrentRoom,
            status: videoState,
            currentTime: currentTime,
            user: this.getProfile?.id,
          });
        }
      }
    },

    handleChangeURL() {
      if (this.isYoutubeLink && this.linkVideo.length != 0)
        this.$socket.emit("changeVideoUrl", {
          room: this.getCurrentRoom,
          name: this.getProfile?.name,
          link: this.linkVideo,
        });
    },
    async handleDelete() {
      try {
        await roomApi.deleteRoomById(this.getCurrentRoom, this.getProfile?.id);
        this.$router.push({ path: "/room" });
        this.$notify({
          type: "info",
          text: "Deleted room!",
        });
      } catch (err) {
        this.$notify({
          type: "error",
          text: err.message,
        });
      }
    },
    matchYoutubeUrl(url) {
      var p =
        /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
      if (url?.match(p)) {
        return true;
      }
      return false;
    },
    handleOpenPasswordModal(room) {
      this.isOpenPasswordModal = true;
      this.roomId = room?._id;
      this.name = room?.name;
      this.owner = room?.owner;
      this.picture = room?.picture;
    },
  },
  watch: {
    linkVideo() {
      this.isYoutubeLink = this.matchYoutubeUrl(this.linkVideo);
    },
    currentVideoUrl() {
      let p =
        /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
      if (this.currentVideoUrl?.length > 0)
        this.videoId = this?.currentVideoUrl?.match(p)[1];
    },
    messageList: {
      handler() {
        const container = this.$el.querySelector("#messageList");
        this.$nextTick(() => {
          container.scrollTop = container.scrollHeight;
        });
      },
      deep: true,
    },
  },
  async mounted() {
    this.setCurrentRoom(this.recentUrl);
    this.changer = this.getProfile?.id;
    try {
      const response = await roomApi.getRoomById(this.getCurrentRoom);
      this.roomName = response.name;
      this.roomOwner = response.owner;
      this.roomPicture = response.picture;
      this.createdAt = response.createdAt;
      this.currentVideoUrl = response.currentVideo;
      this.ownerId = response.ownerId;
    } catch (error) {
      this.$router.push({ path: "/page-not-found" });
    }
  },
  sockets: {
    changedVideoUrl: function (data) {
      this.currentVideoUrl = data.link;
    },
    getVideoChangeState: function (data) {
      if (data.user != this.getProfile?.id && [0, 1, 2].includes(data.status)) {
        this.changer = data.user;
        if (data.status == 2) this.$refs.yt.pauseVideo();
        if (data.status == 1) {
          if (this.currentStatus != 1) this.$refs.yt.playVideo();
          this.$refs.yt.seekTo(data.currentTime + 0.4);
        }
        if (data.status == 0) this.$refs.yt.stopVideo();
      }
    },
    receivedMessage: function (data) {
      this.messageList = [...this.messageList, data];
      this.$refs.inputMessage.focus();
    },
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
    padding: 64px 100px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 1px rgba(255, 255, 255, 0.2) solid;
    .input-container {
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: flex-start;
      padding: 8px 120px;
      .label {
        min-width: 130px;
        border: 1px rgba(255, 255, 255, 0.2) solid;
        background-color: $dark-color;
        border-right: transparent;
        padding: 13px 16px;
        font-size: 17px;
      }
    }
    .container {
      width: 100%;
      padding: 0 120px;
      padding-bottom: 40px;
      align-items: center;
      .info-container {
        display: flex;
        flex: 1;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        margin-left: 32px;
      }
    }
  }
  .video-container {
    padding: 42px 80px;
    background-color: $black-color;
    display: flex;

    .chat-container {
      background-color: $dark-color;
      flex: 1;
      margin-left: 32px;
      display: flex;
      flex-direction: column;
      .message-container {
        display: flex;
        height: 440px;
        overscroll-behavior-y: contain;
        flex-direction: column;
        align-items: flex-start;
        color: white;
        padding: 16px;
      }
    }
  }
}

.button {
  padding: 13px 16px;
}

.message-item {
  display: flex;
  align-items: flex-start;
  margin-top: 8px;
}
.item {
  margin-left: 6px;
  flex: 1;
  padding-right: 12px;
  word-wrap: break-word;
  text-align: left;
  margin-top: 4px;
}
.username {
  font-size: 14px;
  margin-left: 10px;
  color: rgb(156, 156, 156);
  min-width: 80px;
  margin-top: 6px;
  text-align: left;
}

.button-icon {
  margin-right: 32px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
}

.button-icon:hover {
  color: $primary-color;
}

.paddingB {
  height: 360px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
