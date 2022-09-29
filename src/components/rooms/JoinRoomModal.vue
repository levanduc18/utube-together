<template>
  <div class="modal" v-if="isOpen">
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
        <div class="label">Room ID</div>
        <input
          class="input mt8"
          type="text"
          v-model="roomId"
          @keyup.enter="handleJoinRoom()"
          autofocus
          autocomplete="new-password"
          placeholder="Enter room's id"
        />

        <button class="button mt20" @click="handleJoinRoom()">Join</button>
      </div>
    </div>
  </div>
</template>
<script>
import roomApi from "@/api/roomApi";
import { mapActions } from "vuex";

export default {
  name: "JoinRoomModal",
  props: {
    isOpen: Boolean,
  },
  data() {
    return {
      roomId: "",
    };
  },
  methods: {
    ...mapActions("room", ["setCurrentRoom"]),
    async handleJoinRoom() {
      try {
        await roomApi.getRoomById(this.roomId);
        this.$router.push({ path: `/room/${this.roomId}` });
      } catch (error) {
        this.$notify({
          type: "error",
          text: "Room not found!",
        });
      }
    },
    handleClose() {
      this.$emit("update:isOpen", false);
      this.roomId = "";
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
