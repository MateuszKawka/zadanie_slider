<template>
  <div class="slider-container">
    <div class="slider">
      <transition name="fade" mode="out-in">
        <img
          :src="images[index].path"
          class="slider__image"
          :key="images[index].path"
          :style="{ height: `${sliderHeight}px` }"
        />
      </transition>
      <SliderNavigationArrows
        :showPrevImageArrow="index > 0"
        :showNextImageArrow="index < maxIndex"
        @prevImage="prevImageHandler"
        @nextImage="nextImageHandler"
      />

      <SliderNavigationDots
        :imagesCount="maxIndex + 1"
        :currentImageIndex="index"
        @goToImage="goToImageHandler"
      />
    </div>
    <SliderLikes
      @dislike="dislikeHandler"
      @like="likeHandler"
      :likesCount="images[index].likes"
    />
  </div>
</template>

<script>
import SliderLikes from "./SliderLikes";
import SliderNavigationArrows from "./SliderNavigationArrows";
import SliderNavigationDots from "./SliderNavigationDots";
import {
  saveLikesToLocalStorage,
  getLikesFromLocalStorage,
} from "../../helpers";
export default {
  name: "Slider",
  data: () => ({
    images: [],
    index: 0,
  }),
  props: {
    sliderHeight: {
      type: Number,
      default: 480,
    },
  },
  computed: {
    maxIndex() {
      return this.images.length - 1;
    },
  },
  components: {
    SliderLikes,
    SliderNavigationArrows,
    SliderNavigationDots,
  },
  watch: {
    images: {
      deep: true,
      handler(updatedImages) {
        saveLikesToLocalStorage(updatedImages);
      },
    },
  },
  methods: {
    dislikeHandler() {
      if (this.images[this.index].likes > 0) {
        this.images[this.index].likes = --this.images[this.index].likes;
      }
    },
    likeHandler() {
      this.images[this.index].likes = ++this.images[this.index].likes;
    },
    prevImageHandler() {
      if (this.index > 0) {
        this.index = --this.index;
      }
    },
    nextImageHandler() {
      if (this.index < this.maxIndex) {
        this.index = ++this.index;
      }
    },
    goToImageHandler(imageIndex) {
      this.index = imageIndex;
    },
    createLikesForImages() {
      this.likes = this.images.map(() => 0);
    },
  },
  beforeMount() {
    const savedLikes = getLikesFromLocalStorage();

    // if image path is find in local storage, set likes, otherwise set likes to 0
    this.images = IMAGES.map((item) => ({
      path: item,
      likes:
        savedLikes[savedLikes.findIndex(({ path }) => path === item)].likes,
    }));
  },
};

const IMAGES = [
  "https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
  "https://images.pexels.com/photos/373912/pexels-photo-373912.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
  "https://images.pexels.com/photos/135018/pexels-photo-135018.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
  "https://images.pexels.com/photos/584578/pexels-photo-584578.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
  "https://images.pexels.com/photos/734102/pexels-photo-734102.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
];
</script>

<style lang="scss" scoped>
.slider {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  position: relative;
  margin-top: 10%;
}

.slider__image {
  width: 80%;
  object-fit: cover;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
