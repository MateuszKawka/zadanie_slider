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
  width: 100%;
  margin-top: $s2;
  display: flex;
  justify-content: center;
}

.dot {
  width: 10px;
  height: 10px;
  background: $dark-color;
  border-radius: 100%;
  border: none;
  cursor: pointer;
  transition: background 0.25s ease-in-out;

  &:hover {
    background: $dark-color-opposite;
  }
}

.dot--active {
  background: $details-color;
}

.dot:not(:first-child) {
  margin-left: 12px;
}
</style>
