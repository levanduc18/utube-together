<template>
  <div class="carrousel-container">
    <div class="title">Technologies</div>
    <Carousel
      class="carousel"
      :items-to-show="3"
      :autoplay="3000"
      :wrap-around="true"
    >
      <Slide v-for="item in items" :key="item.label">
        <div class="carousel__item">
          <img :src="item.image" class="image-container" />
        </div>
      </Slide>
    </Carousel>
  </div>
</template>
<script>
import { Carousel, Slide } from "vue3-carousel";
import "vue3-carousel/dist/carousel.css";
import vueLogo from "@/assets/logo-vuejs.jpeg";
import fontAwesomeLogo from "@/assets/logo-fa.webp";
import nodeLogo from "@/assets/logo-node.webp";
import expressLogo from "@/assets/logo-express.png";
import mongoDbLogo from "@/assets/logo-mongo.jpeg";
import socketLogo from "@/assets/logo-socket.jpeg";

export default {
  name: "CarouselBrand",
  setup() {
    return {
      items: [
        {
          image: vueLogo,
          label: "VueJS",
        },
        {
          image: fontAwesomeLogo,
          label: "Fontawesome",
        },
        {
          image: nodeLogo,
          label: "NodeJS",
        },
        {
          image: expressLogo,
          label: "ExpressJS",
        },
        {
          image: mongoDbLogo,
          label: "MongoDB",
        },
        {
          image: socketLogo,
          label: "Socket.IO",
        },
      ],
    };
  },
  components: {
    Carousel,
    Slide,
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/css/_variables.scss";
.carrousel-container {
  width: 100%;
  padding: 40px 0;
  background-color: rgba(0, 0, 0, 0.5);
  .title {
    color: #fff;
    font-size: 32px;
  }
  .carousel {
    width: 100%;
    margin-top: 40px;
    .image-container {
      width: auto;
      height: 160px;
    }
  }
}
</style>
