<template>
  <div class="slider-content">
    <p class="slider-content__title">{{ title }}</p>
    <p class="slider-content__subtitle">{{ subtitle }}</p>
  </div>
</template>

<script>
export default {
  name: "SliderContent",
  props: {
    title: {
      type: String,
      default: "",
    },
    subtitle: {
      type: String,
      default: "",
    },
  },
};
</script>

<style lang="scss" scoped>
.slider-content {
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  padding: $s1 $s2;
  background: rgba(0, 0, 0, 0.7);
  color: #fff;

  .slider-content__title {
    font-size: 0.9rem;
    font-weight: 700;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }

  .slider-content__subtitle {
    margin-top: 4px;
    font-size: 0.9rem;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2; /* number of lines to show */
    -webkit-box-orient: vertical;
  }
}
</style>
