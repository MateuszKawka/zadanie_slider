<template>
  <div class="slider-likes">
    <button
      @click="dislike"
      class="slider-likes__button slider-likes__button--dislike"
    >
      -
    </button>
    <p class="slider-likes__likes">{{ likesCount }}</p>
    <button
      @click="like"
      class="slider-likes__button slider-likes__button--like"
    >
      +
    </button>
  </div>
</template>

<script>
export default {
  name: "SliderLikes",
  props: {
    likesCount: {
      type: Number,
      default: 0,
    },
  },
  methods: {
    dislike() {
      this.$emit("dislike");
    },
    like() {
      this.$emit("like");
    },
  },
};
</script>

<style lang="scss">
.slider-likes {
  width: 164px;
  height: 64px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background: $light-color;
}

.slider-likes__likes {
  font-size: 1rem;
  color: $dark-color;
  font-weight: 700;
  margin: 0 $s2;
}

.slider-likes__button {
  border: none;
  background: none;
  font-size: 1.6rem;
  font-weight: 700;
  cursor: pointer;
}

.slider-likes__button--dislike {
  color: $danger-color;
}

.slider-likes__button--like {
  color: $success-color;
}
</style>
