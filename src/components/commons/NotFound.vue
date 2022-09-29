<template>
  <div class="notfound">
    <div class="notfound-top"></div>
    <div class="notfound-general-info">
      <img :src="NotFoundPNG" width="360" height="240" />
      <div class="title">Page not found</div>
      <router-link to="/" exact class="link">Go home page</router-link>
    </div>
  </div>
</template>
<script>
import NotFoundPNG from "@/assets/404.png";
export default {
  name: "NotFound",
  data() {
    return {
      NotFoundPNG,
    };
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/css/variables.scss";
.notfound {
  width: 100%;
  .notfound-top {
    position: fixed;
    top: 0;
    width: 100%;
    height: 100vh;

    background-color: #ff3cac;
    background-image: linear-gradient(
      225deg,
      #ff3cac 0%,
      #784ba0 50%,
      #2b86c5 100%
    );

    background-repeat: no-repeat;
    background-size: cover !important;
    background-position: center center !important;
    filter: brightness(15%);
    z-index: -1;
  }
  .notfound-general-info {
    padding: 60px 100px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
.title {
  font-size: 32px;
}

.link {
  color: $primary-color;
  margin-top: 24px;
}

.link:hover {
  text-decoration: underline;
}
</style>
