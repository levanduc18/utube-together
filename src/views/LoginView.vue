<template>
  <div class="login-view">
    <div class="backdrop"></div>
    <div class="login-form-container">
      <div class="login-form-title">LOG IN</div>
      <div class="login-form-content">
        <div>WELCOME TO UTUBE TOGETHER</div>
        <div class="button-container">
          <a :href="API_URL + '/auth/google'" class="login-with-gg">
            <img :src="logoGG" width="20" height="20" />
            <span class="login-with-gg-title"> Login with Google</span>
          </a>
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
    padding: 40px;
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

    .button-container {
      text-align: left;
      margin-top: 24px;

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

.login-form-content {
  margin-top: 24px;
  text-align: left;
}
</style>
