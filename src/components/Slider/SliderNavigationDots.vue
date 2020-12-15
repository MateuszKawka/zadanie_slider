<template>
  <div class="slider-navigation-dots">
    <button
      class="dot"
      v-for="(n, imageIndex) in imagesCount"
      :class="{ 'dot--active': imageIndex === currentImageIndex }"
      @click="goToImage(imageIndex)"
      :key="`dot__${imageIndex}`"
    ></button>
  </div>
</template>

<script>
export default {
  name: "SliderNavigationDots",
  props: {
    imagesCount: {
      type: Number,
      required: true,
    },
    currentImageIndex: {
      type: Number,
      required: true,
    },
  },
  methods: {
    goToImage(imageIndex) {
      this.$emit("goToImage", imageIndex);
    },
  },
};
</script>

<style lang="scss">
.slider-navigation-dots {
  display: flex;
  position: absolute;
  bottom: -24px;
}

.dot {
  width: 10px;
  height: 10px;
  background: $dark-color;
  border-radius: 100%;
  border: none;
  cursor: pointer;
  transition: background 0.25s ease-in-out;
}

.dot--active {
  background: $details-color;
}

.dot:not(:first-child) {
  margin-left: 12px;
}
</style>
