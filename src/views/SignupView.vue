<template>
  <div class="login-view">
    <div class="backdrop"></div>
    <div class="login-form-container">
      <div class="login-form-title">SIGN UP</div>
      <div class="login-form-content">
        <div class="input-inline-container">
          <div class="password-container">
            <div class="input-container">
              <div class="input-label">Email Address *</div>
              <input class="input" type="text" v-model="email" />
              <div class="error-text" v-if="isErrorEmail">
                Email is wrong format
              </div>
            </div>
          </div>
          <div class="password-container">
            <div class="input-container">
              <div class="input-label">Nick name *</div>
              <input class="input" type="text" v-model="nickName" />
              <div class="error-text" v-if="isErrorNickName">
                Nick name is required
              </div>
            </div>
          </div>
        </div>
        <div class="input-inline-container">
          <div class="password-container">
            <div class="input-container">
              <div class="input-label">Password *</div>
              <input
                class="input"
                :type="isShowPassword ? 'text' : 'password'"
                v-model="password"
              />
              <div class="error-text" v-if="isErrorPassword">
                Password must be longer 6 characters
              </div>
            </div>

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
          <div class="password-container">
            <div class="input-container">
              <div class="input-label">Repeat password *</div>
              <input
                class="input"
                :type="isShowRepeatPassword ? 'text' : 'password'"
                v-model="repeatPassword"
              />
              <div class="error-text" v-if="isErrorRepeatPassword">
                Repeat password is not matched
              </div>
            </div>
            <div
              class="showButton"
              @click="isShowRepeatPassword = !isShowRepeatPassword"
            >
              <font-awesome-icon
                :icon="['fas', 'eye-slash']"
                class="button-icon"
                v-if="isShowRepeatPassword"
              />
              <font-awesome-icon
                :icon="['fas', 'eye']"
                class="button-icon"
                v-else
              />
            </div>
          </div>
        </div>
        <div class="radio-container">
          <label class="container">
            <input
              class="radio-button"
              type="radio"
              value="male"
              v-model="gender"
            />
            Male
          </label>
          <label class="container">
            <input
              class="radio-button"
              type="radio"
              value="female"
              v-model="gender"
              :style="{ marginLeft: '24px' }"
            />
            Female
          </label>
        </div>
        <div class="button-container">
          <button class="button" @click="handleSignup()">Sign up</button>
          <div class="link-container">
            <router-link class="nav_center-menu-item" to="/login" exact>
              <span class="link-left">Log in</span>
            </router-link>
            <span class="link-right">Have a problem?</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import authApi from "@/api/authApi";
import { validateEmail } from "@/helpers/validation";

export default {
  name: "LoginView",
  data() {
    return {
      email: "",
      nickName: "",
      isErrorNickName: false,
      password: "",
      isShowPassword: false,
      repeatPassword: "",
      isShowRepeatPassword: false,
      gender: "male",
      isErrorEmail: false,
      isErrorPassword: false,
      isErrorRepeatPassword: false,
    };
  },
  methods: {
    async handleSignup() {
      try {
        if (
          this.isErrorEmail ||
          this.isErrorNickName ||
          this.isErrorPassword ||
          this.isErrorRepeatPassword
        )
          return;
        await authApi.signup({
          email: this.email,
          name: this.nickName,
          password: this.password,
          gender: this.gender,
        });
        this.$router.push({ path: "/login" });
      } catch (error) {
        this.$notify({
          type: "error",
          text: error.response.data.message,
        });
      }
    },
  },
  watch: {
    email() {
      this.isErrorEmail = !validateEmail(this.email);
    },
    nickName() {
      this.isErrorNickName = this.nickName.length == 0;
    },
    password() {
      this.isErrorPassword = this.password.length < 6;
    },
    repeatPassword() {
      this.isErrorRepeatPassword = this.repeatPassword != this.password;
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/css/variables.scss";
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
  .input-container {
    flex-basis: 100%;
    text-align: left;
    margin-bottom: 24px;
    .input-label {
      margin-bottom: 8px;
    }
  }
  .login-form-container {
    width: 720px;
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
      width: 70px;
      height: 100%;
      z-index: 3;
      border-bottom: 3px $primary-color solid;
      box-sizing: border-box;
    }
    .login-form-content {
      padding: 24px 0;
      .input-inline-container {
        display: flex;
        align-items: center;
        justify-content: space-between;

        .password-container {
          display: flex;
          align-items: center;
          flex-basis: 48%;
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
      .radio-container {
        width: 100%;
        display: flex;
        align-items: center;
        margin-bottom: 24px;
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
      }
    }
  }
}
</style>
