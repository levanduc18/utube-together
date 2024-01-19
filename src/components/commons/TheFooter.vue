<template>
  <div class="footer" v-if="currentRouteName != 'login'">
    <div class="left">
      <div class="nav_left">
        <img :src="logoPNG" width="32" height="32" />
        <span class="nav_left-web-name">UTUBE TOGETHER</span>
      </div>
      <div class="slogan">We watch together, we relax together.</div>
      <div class="slogan1">A product for JMG team.</div>
    </div>
    <div class="right">
      <span class="slogan">Created by: Le Van Duc</span>

      <div class="slogan1">Phone: +84 (0) 795 799 457</div>
      <div class="slogan1">Email: lvd181299@gmail.com</div>
    </div>
  </div>
</template>
<script>
import logoPNG from "@/assets/logo.png";
export default {
  name: "TheFooter",
  setup() {
    return {
      logoPNG,
    };
  },
  computed: {
    currentRouteName() {
      return this.$route.name;
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/css/variables.scss";
.footer {
  background-color: $dark-color;
  padding: 56px 48px;
  width: 100%;
  display: flex;
  align-items: center;

  .left {
    flex-basis: 60%;
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    .nav_left {
      display: flex;
      align-items: center;
      .nav_left-web-name {
        margin-left: 8px;
      }
    }
    .slogan {
      margin-top: 24px;
      font-size: 20px;
      font-weight: 600;
    }

    .slogan1 {
      margin-top: 24px;
      color: rgb(185, 185, 185);
    }
  }

  .right {
    flex-basis: 40%;
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    .nav_left {
      display: flex;
      align-items: center;
      .nav_left-web-name {
        margin-left: 8px;
      }
    }
    .slogan {
      margin-top: 24px;
      font-size: 20px;
      font-weight: 600;
    }

    .slogan1 {
      margin-top: 24px;
      color: rgb(185, 185, 185);
    }
  }
}
</style>
