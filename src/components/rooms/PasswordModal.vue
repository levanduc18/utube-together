<template>
  <div
    class="modal"
    v-if="isOpen || (!getIsEnterPassword && getCurrentRoom == roomId)"
  >
    <div class="modal-container">
      <div class="modal-header">
        <div class="modal-title">Join room</div>
        <font-awesome-icon
          :icon="['fas', 'close']"
          :style="{ marginRight: '8px' }"
          class="close-icon"
          @click="handleClose()"
        />
      </div>
      <div class="divider"></div>
      <div class="modal-content">
        <img :src="picture" height="80" width="80" class="picture" />
        <div class="container" :style="{ justifyContent: 'space-between' }">
          <div class="label" :style="{ marginBottom: 0 }">Room ID</div>
          <span :style="{ fontSize: '18px', flex: 1, textAlign: 'right' }">
            {{ roomId }}
          </span>
        </div>
        <div class="container mt8" :style="{ justifyContent: 'space-between' }">
          <div class="label" :style="{ marginBottom: 0 }">Name</div>
          <span :style="{ fontSize: '18px', flex: 1, textAlign: 'right' }">
            {{ name }}
          </span>
        </div>
        <div class="container mt8 w-full">
          <div class="label" :style="{ marginBottom: 0 }">Owner</div>
          <span :style="{ fontSize: '18x', flex: 1, textAlign: 'right' }">
            {{ owner }}
          </span>
        </div>
        <div class="divider mt8"></div>

        <div class="password-container mt20">
          <input
            class="input"
            :type="isShowPassword ? 'text' : 'password'"
            v-model="password"
            @keyup.enter="handleJoinRoom()"
            autofocus
            autocomplete="new-password"
            placeholder="Enter room's password"
          />
          <div class="showButton" @click="isShowPassword = !isShowPassword">
            <font-awesome-icon
              :icon="['fas', 'eye-slash']"
              class="button-icon"
              v-if="isShowPassword"
            />
            <font-awesome-icon
              :icon="['fas', 'eye']"
              class="button-icon"
              v-else
            />
          </div>
        </div>
        <button class="button mt20" @click="handleJoinRoom()">Join</button>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "PasswordModal",
  props: {
    isOpen: Boolean,
    roomId: String,
    name: String,
    owner: String,
    picture: String,
  },
  data() {
    return {
      password: "",
      isShowPassword: false,
    };
  },
  computed: {
    ...mapGetters("authentication", ["getProfile"]),
    ...mapGetters("room", ["getIsEnterPassword", "getCurrentRoom"]),
  },
  methods: {
    ...mapActions("room", ["setCurrentRoom"]),
    handleJoinRoom() {
      this.$socket.emit("joinRoom", {
        room: this.roomId,
        name: this.getProfile?.name,
        password: this.password,
      });
    },
    handleClose() {
      if (!this.getIsEnterPassword && this.getCurrentRoom == this.roomId)
        this.$router.push({ path: "/room" });
      else this.$emit("update:isOpen", false);
      this.password = "";
      this.isShowPassword = false;
    },
  },
  sockets: {
    joinedRoom: function (data) {
      this.$emit("update:isOpen", false);
      this.setCurrentRoom(data.roomId);
      this.$router.push({ path: `/room/${data.roomId}` });
    },
  },
};
</script>
<style lang="scss" scoped>
.password-container {
  display: flex;
  align-items: center;
  .showButton {
    width: 60px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #333;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
  }
  .showButton:hover {
    background-color: rgb(88, 88, 88);
  }
}
.picture {
  border-radius: 50%;
  margin-bottom: 32px;
}
</style>
