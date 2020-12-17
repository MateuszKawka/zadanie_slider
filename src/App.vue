<template>
  <div class="container">
    <Slider
      :sliderHeight="sliderHeight"
      :images="images"
      v-if="imagesReady && Array.isArray(images)"
    />
    <p v-else-if="imagesReady">Something goes wrong, try again</p>
    <Spinner v-else />
  </div>
</template>

<script>
import Slider from "./components/Slider/Slider.vue";
import Spinner from "./components/Spinner";
import { fetchImages } from "./services/apiService";
export default {
  name: "App",
  data: () => ({
    imagesReady: false,
    images: [],
  }),
  components: {
    Slider,
    Spinner,
  },
  computed: {
    windowWidth() {
      return window.screen.width;
    },
    sliderHeight() {
      const windowWidth = window.screen.width;
      const tabletWidth = 720;
      const desktopWidth = 920;
      switch (true) {
        case windowWidth < tabletWidth:
          return 220;
        case windowWidth < desktopWidth:
          return 320;
        default:
          return 400;
      }
    },
  },
  methods: {
    async getImages() {
      try {
        const images = await fetchImages();
        this.images = images.map((dataItem) => ({
          id: dataItem.id,
          ...dataItem.acf,
        }));
        this.imagesReady = true;
      } catch(e) {
        this.imagesReady = true;
      }
    },
  },
  mounted() {
    this.getImages();
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
  min-height: 50vh;
  margin: 0 auto;
  padding: 0 $s2;

  display: flex;
  justify-content: center;
  align-items: center;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
</style>
