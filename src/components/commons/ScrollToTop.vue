<template>
  <div id="scrollToTop" v-show="scY > 300" @click="toTop">
    <font-awesome-icon
      :icon="['fas', 'chevron-up']"
      class="button-icon"
      size="lg"
    />
  </div>
</template>
<script>
export default {
  name: "ScrollToTop",
  data() {
    return {
      scTimer: 0,
      scY: 0,
    };
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  methods: {
    handleScroll: function () {
      if (this.scTimer) return;
      this.scTimer = setTimeout(() => {
        this.scY = window.scrollY;
        clearTimeout(this.scTimer);
        this.scTimer = 0;
      }, 100);
    },
    toTop: function () {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    },
  },
};
</script>
<style lang="scss">
@import "@/assets/css/variables.scss";
#scrollToTop {
  position: fixed;
  bottom: 40px;
  right: 20px;
  background-color: $primary-color;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  .button-icon {
    color: #fff;
  }
}
#scrollToTop:hover {
  filter: brightness(120%);
}
</style>
