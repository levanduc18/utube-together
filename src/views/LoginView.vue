<template>
  <div class="login-view">
    <div class="backdrop"></div>
    <div class="login-form-container">
      <div class="login-form-title">LOG IN</div>
      <div class="login-form-content">
        <div class="input-container">
          <div class="input-label">Email Address</div>
          <input class="input" type="text" v-model="email" />
          <div class="error-text" v-if="isErrorEmail">
            Email is wrong format
          </div>
        </div>
        <div class="input-container">
          <div class="input-label">Password</div>
          <div class="password-container">
            <input
              class="input"
              :type="isShowPassword ? 'text' : 'password'"
              v-model="password"
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
          <div class="error-text" v-if="isErrorPassword">
            Password must be longer 6 characters
          </div>
        </div>

        <div class="button-container">
          <div class="checkbox-container">
            <input type="checkbox" class="checkbox" />
            <span>Remember me</span>
          </div>
          <button class="button" @click="handleLogin()">Log in</button>
          <div class="or-container">OR</div>
          <a :href="API_URL + '/auth/google'" class="login-with-gg">
            <img :src="logoGG" width="20" height="20" />
            <span class="login-with-gg-title"> Login with Google</span>
          </a>
          <div class="link-container">
            <router-link class="nav_center-menu-item" to="/signup" exact>
              <span class="link-left">Sign up</span>
            </router-link>
            <span class="link-right">Lost your password?</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import logoGG from "@/assets/logo-gg.png";
import { validateEmail } from "@/helpers/validation.js";
import { mapActions } from "vuex";
import { API_URL } from "@/constants/env";
export default {
  name: "LoginView",
  setup() {
    return {
      logoGG,
    };
  },
  data() {
    return {
      email: "",
      password: "",
      isShowPassword: false,
      isErrorEmail: false,
      isErrorPassword: false,
      API_URL,
    };
  },
  methods: {
    ...mapActions("authentication", ["login"]),
  },
  watch: {
    email() {
      this.isErrorEmail = !validateEmail(this.email);
    },
    password() {
      this.isErrorPassword = this.password.length < 6;
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/css/variables.scss";
.vue-notification {
  font-size: 20px;
}
.login-view {
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url("@/assets/bg-main.jpg");
  background-repeat: no-repeat;
  background-size: cover !important;
  background-position: center center !important;
  .backdrop {
    position: fixed;
    top: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      rgba(10, 14, 23, 0.6) 0%,
      rgba(10, 14, 23, 0.6) 100%
    );
    backdrop-filter: blur(6px);
  }
  .login-form-container {
    width: 400px;
    background-color: $dark-color;
    z-index: 2;
    padding: 20px;
    .login-form-title {
      width: 100%;
      text-align: left;
      font-size: 20px;
      font-weight: 600;
      border-bottom: 1px rgba(139, 139, 139, 0.1) solid;
      padding: 4px 0 10px 0;
      position: relative;
    }
    .login-form-title::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 60px;
      height: 100%;
      z-index: 3;
      border-bottom: 3px $primary-color solid;
      box-sizing: border-box;
    }
    .login-form-content {
      padding: 24px 0;
      .input-container {
        text-align: left;
        margin-bottom: 24px;
        .input-label {
          margin-bottom: 8px;
        }
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
        .error-text {
          color: red;
          margin-top: 6px;
          font-size: 14px;
        }
      }
      .button-container {
        text-align: left;
        .checkbox-container {
          display: flex;
          align-items: center;
          margin-bottom: 24px;
          .checkbox {
            margin-right: 12px;
          }
        }
        .link-container {
          margin-top: 24px;
          .link-left {
            color: $primary-color;
            padding-right: 8px;
            border-right: 1px #fff solid;
            cursor: pointer;
          }
          .link-right {
            color: $primary-color;
            padding-left: 8px;
            cursor: pointer;
          }
          .link-left:hover,
          .link-right:hover {
            filter: brightness(120%);
          }
        }
        .or-container {
          padding: 16px 0;
          text-align: center;
        }
        .login-with-gg {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 12px 0;
          background-color: rgb(228, 228, 228);
          cursor: pointer;
          .login-with-gg-title {
            color: $black-color;
            margin-left: 16px;
          }
        }
        .login-with-gg:hover {
          background-color: #fff;
        }
      }
    }
  }
}
</style>
