<template>
  <div class="container">
    <Slider :sliderHeight="sliderHeight" />
  </div>
</template>

<script>
import Slider from "./components/Slider/Slider.vue";

export default {
  name: "App",
  components: {
    Slider,
  },
  computed: {
    sliderHeight() {
      const windowWidth = window.screen.width;
      console.log(windowWidth);
      //const mobileWidth = 480;
      const tabletWidth = 720;
      const desktopWidth = 920;

      switch (true) {
        case windowWidth < tabletWidth:
          return 240;
        case windowWidth < desktopWidth:
          return 320;
        default:
          return 480;
      }
    },
  },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap");

html {
  font-family: "Roboto", sans-serif;
}

.container {
  max-width: 960px;
  height: 100%;
  margin: 0 auto;
  padding: 0 $s2;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
</style>
