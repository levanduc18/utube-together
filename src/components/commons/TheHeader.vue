<template>
  <div
    class="nav"
    :class="{ navOnTop: view.topOfPage }"
    v-if="currentRouteName != 'login'"
  >
    <div class="nav_left">
      <img :src="logoPNG" width="32" height="32" />
      <span class="nav_left-web-name">UTUBE TOGETHER</span>
    </div>
    <div class="nav_center">
      <ul class="nav_center-menu">
        <router-link class="nav_center-menu-item" to="/" exact>
          Home
        </router-link>
        <router-link
          class="nav_center-menu-item"
          to="/room"
          :class="{
            'router-link-exact-active': this.$route.params?.id?.length > 0,
          }"
        >
          Room
        </router-link>

        <!-- <router-link class="nav_center-menu-item" to="/about" exact>
          About
        </router-link>
        <router-link class="nav_center-menu-item" to="/contact" exact>
          Contact
        </router-link> -->
      </ul>
    </div>
    <div class="nav_right" v-if="!getAuthenticated">
      <router-link class="nav_center-menu-item" to="/login" exact>
        <button class="button">Log in</button>
      </router-link>
    </div>
    <div class="nav_right" v-else tabindex="0">
      <div class="info-container" @click="isShowMenu = !isShowMenu">
        <div class="avatar-container">
          <img :src="getProfile?.avatar" height="32" width="32" />
        </div>
        <span class="username">{{ getProfile?.name }}</span>
      </div>
      <div class="dropdown-content" v-if="isShowMenu">
        <div class="container">
          <font-awesome-icon
            :icon="['fas', 'user']"
            :style="{ marginRight: '8px' }"
          />
          <div class="menu-name">My profile</div>
        </div>
        <div class="container">
          <font-awesome-icon
            :icon="['fas', 'gear']"
            :style="{ marginRight: '8px' }"
          />
          <div class="menu-name">Settings</div>
        </div>
        <a :href="API_URL + '/auth/logout'">
          <div class="container">
            <font-awesome-icon
              :icon="['fas', 'arrow-right-from-bracket']"
              :style="{ marginRight: '8px' }"
            />
            <div class="menu-name">Logout</div>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>
<script>
import logoPNG from "@/assets/logo.png";
import { API_URL } from "@/constants/env";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "TheHeader",
  setup() {
    return {
      logoPNG,
    };
  },
  data() {
    return {
      view: {
        topOfPage: false,
      },
      isShowMenu: false,
      API_URL,
    };
  },
  computed: {
    ...mapGetters("authentication", ["getAuthenticated", "getProfile"]),
    currentRouteName() {
      return this.$route.name;
    },
  },
  beforeMount() {
    window.addEventListener("scroll", this.handleScroll);
  },
  methods: {
    ...mapActions("authentication", ["logout"]),
    handleScroll() {
      if (window.pageYOffset > 80) {
        if (!this.view.topOfPage) this.view.topOfPage = true;
      } else {
        if (this.view.topOfPage) this.view.topOfPage = false;
      }
    },
    close(e) {
      if (!this.$el.contains(e.target)) {
        this.isShowMenu = false;
      }
    },
  },
  mounted() {
    document.addEventListener("click", this.close);
  },
  beforeUnmount() {
    document.removeEventListener("click", this.close);
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/css/variables";
.nav {
  width: 100%;
  height: 84px;
  display: flex;
  align-items: center;
  padding: 0 24px;
  z-index: 999;
  background-color: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(3px);
  .nav_left {
    display: flex;
    align-items: center;
    cursor: pointer;
    .nav_left-web-name {
      font-weight: 600;
      margin-left: 8px;
      font-size: 16px;
      color: #fff;
    }
  }

  .nav_center {
    flex: 1;
    .nav_center-menu {
      display: flex;
      align-items: center;
      justify-content: center;

      a.router-link-exact-active {
        color: $primary-color;
      }
    }
  }

  .nav_right {
    display: flex;
    align-items: center;

    .info-container {
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      box-sizing: border-box;
      padding: 6px 10px;
      border: 1px transparent solid;
      transition: all 0.4s ease-in-out;
      position: relative;
      .avatar-container {
        width: 32px;
        height: 32px;
        background-color: rgb(165, 165, 165);
        border-radius: 50%;
        // border: 1px rgb(88, 88, 88) solid;
        display: flex;
        align-items: center;
        overflow: hidden;
        justify-content: center;
        margin-right: 12px;
      }
    }
    .info-container:hover {
      border: 1px rgba(255, 255, 255, 0.2) solid;
    }
    .dropdown-content {
      position: absolute;
      top: calc(100% - 16px);
      background-color: rgba(0, 0, 0, 0.4);
      width: 160px;
      border: 1px rgba(255, 255, 255, 0.2) solid;
      z-index: 1;
      .container {
        width: 100%;
        display: flex;
        flex-direction: row;
        padding: 0 16px;
        .menu-name {
          width: 80%;
          text-align: left;
          min-width: 100px;
        }
      }
    }
    .dropdown-content div {
      color: #fff;
      padding: 12px 16px;
      background-color: transparent;
      text-decoration: none;
      display: block;
      cursor: pointer;
      transition: background-color 0.2s ease-in-out;
    }

    .dropdown-content div:hover {
      background-color: $primary-color;
    }
  }
}

.nav_center-menu-item {
  font-size: 16px;
  color: #fff;
  margin: auto 16px;
  cursor: pointer;
  transition: color 0.2s ease-in-out;
}
.nav_center-menu-item:hover {
  color: $primary-color;
}

.navOnTop {
  position: fixed;
  top: 0;
  background-color: $dark-color;
}
</style>
