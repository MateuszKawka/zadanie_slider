<template>
  <div class="slider-control">
    <button
      class="slider__arrow slider__arrow--left arrow left"
      @click="prevImage"
      v-if="showPrevImageArrow"
    ></button>
    <div v-else></div>
    <button
      class="slider__arrow slider__arrow--right arrow right"
      @click="nextImage"
      v-if="showNextImageArrow"
    ></button>
  </div>
</template>

<script>
export default {
  name: "SliderNavigation",
  props: {
    showPrevImageArrow: {
      type: Boolean,
      required: true,
    },
    showNextImageArrow: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    prevImage() {
      this.$emit("prevImage");
    },
    nextImage() {
      this.$emit("nextImage");
    },
  },
};
</script>

<style lang="scss">
.slider-control {
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 0 $s1;
  position: absolute;
}

.arrow {
  border: solid $dark-color;
  border-width: 0 4px 4px 0;
  display: inline-block;
  background: none;
  padding: 5px;
  cursor: pointer;
}

.arrow:hover {
  border-color: $details-color;
}

.right {
  transform: rotate(-45deg);
  -webkit-transform: rotate(-45deg);
}

.left {
  transform: rotate(135deg);
  -webkit-transform: rotate(135deg);
}

@media all and(min-width: $tablet) {
  .slider-control {
    padding: 0 $s2;
  }
}
</style>
