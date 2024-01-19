<template>
  <div class="home">
    <div class="home_bg-top"></div>
    <div class="home_general-info">
      <div class="home_general-info-logo">
        <img :src="logoPNG" width="64" height="64" />
        <span class="home_general-info-logo-name">UTUBE TOGETHER</span>
      </div>
      <div class="home_general-info-title">
        Enjoy moments with friends watching special Youtube videos
      </div>
      <div class="home_general-info-button-container">
        <router-link to="/room" exact>
          <button class="button">
            <font-awesome-icon
              :icon="['fas', 'play-circle']"
              class="button-icon"
            />
            Create room now
          </button>
        </router-link>
        <button class="button-outline">Read more</button>
      </div>
      <img class="image" :src="template1PNG" width="720" height="390" />
    </div>
    <div class="home-carousel-container">
      <carousel-brand />
    </div>
  </div>
</template>

<script>
import logoPNG from "@/assets/logo.png";
import CarouselBrand from "@/components/commons/CarouselBrand.vue";
import template1PNG from "@/assets/template1.png";
export default {
  name: "HomeView",
  setup() {
    return {
      logoPNG,
      template1PNG,
    };
  },
  components: { CarouselBrand },
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/variables.scss";
.home {
  width: 100%;
  .home_bg-top {
    position: fixed;
    top: 0;
    width: 100%;
    height: 100vh;
    background-image: url("@/assets/bg-main.jpg");
    background-repeat: no-repeat;
    background-size: cover !important;
    background-position: center center !important;
    filter: brightness(20%);
    z-index: -1;
  }
  .home_general-info {
    width: 100%;
    padding: 120px 0 120px 0;

    display: flex;
    flex-direction: column;
    align-items: center;
    .home_general-info-logo {
      display: flex;
      align-items: center;

      .home_general-info-logo-name {
        font-weight: 600;
        margin-left: 16px;
        font-size: 28px;
        color: #fff;
      }
    }

    .home_general-info-title {
      color: #fff;
      font-size: 48px;
      font-weight: 600;
      width: 800px;
      line-height: 1.4em;
      margin-top: 24px;
    }

    .home_general-info-button-container {
      margin-top: 24px;
      display: flex;
      align-items: center;
      .button-outline {
        margin-left: 16px;
      }
    }
  }

  .home-carousel-container {
    width: 100%;
    display: flex;
    justify-content: center;
  }
}
.image {
  margin-top: 64px;
  filter: blur(0.7px);
}
</style>
