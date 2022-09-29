<template>
  <div class="modal" v-if="isOpen">
    <div class="modal-container">
      <div class="modal-header">
        <div class="modal-title">Create new room</div>
        <font-awesome-icon
          :icon="['fas', 'close']"
          :style="{ marginRight: '8px' }"
          class="close-icon"
          @click="$emit('update:isOpen', false)"
        />
      </div>
      <div class="divider"></div>
      <div class="modal-content">
        <div class="label">Name</div>
        <input
          class="input"
          type="text"
          v-model="name"
          @keyup.enter="handleCreateRoom()"
          autofocus
          placeholder="Your room name"
          autocomplete="new-password"
        />
        <div class="label mt20">Password</div>
        <div class="password-container">
          <input
            class="input"
            :type="isShowPassword ? 'text' : 'password'"
            v-model="password"
            @keyup.enter="handleCreateRoom()"
            placeholder="Your room password"
            autocomplete="new-password"
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
        <button class="button mt20" @click="handleCreateRoom()">Create</button>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "NewRoomModal",
  props: {
    isOpen: Boolean,
  },
  data() {
    return {
      name: "",
      password: "",
      isShowPassword: false,
      picture: "",
    };
  },
  computed: {
    ...mapGetters("room", ["getRoomList"]),
    ...mapGetters("authentication", ["getProfile"]),
  },
  methods: {
    ...mapActions("room", ["setRoomList"]),
    async handleCreateRoom() {
      try {
        const response = await axios.get(
          "https://api.thecatapi.com/v1/images/search"
        );
        this.picture = response.data[0]?.url;
      } catch (error) {
        this.$notify({
          type: "error",
          text: "Fetch picture failed",
        });
      }

      this.$socket.emit("createRoom", {
        name: this.name,
        password: this.password,
        owner: this.getProfile?.name,
        ownerId: this.getProfile?.id,
        picture: this.picture,
      });
    },
  },
  sockets: {
    createdRoom: function () {
      this.$emit("update:isOpen", false);
      this.name = "";
      this.password = "";
      this.isShowPassword = false;
      this.picture = "";
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
</style>
