<template>
  <div class="slider-container">
    <SliderLikes
      @dislike="dislikeHandler"
      @like="likeHandler"
      v-if="likes.length"
      :likesCount="likes[indexOfCurrentImageLikes].likes"
    />
    <div class="slider">
      <div class="slider-image-container">
        <transition name="fade" mode="out-in">
          <div
            class="image-overlay"
            :class="{
              'image-overlay--like': showHappyImage,
              'image-overlay--dislike': showSadImage,
            }"
            v-if="showHappyImage || showSadImage"
          >
            <p class="image-overlay__content" v-if="showHappyImage">:)</p>
            <p class="image-overlay__content" v-if="showSadImage">:(</p>
          </div>
        </transition>
        <transition name="fade" mode="out-in">
          <img
            :src="images[index].image"
            class="slider__image slider__image--happy"
            :key="images[index].image"
            :style="{ height: `${sliderHeight}px` }"
          />
        </transition>
        <transition name="fade" mode="out-in">
          <SliderContent
            :key="images[index].title"
            v-if="images[index].title || images[index].subtitle"
            :title="images[index].title"
            :subtitle="images[index].subtitle"
          />
        </transition>
      </div>
      <SliderNavigationArrows
        :showPrevImageArrow="index > 0"
        :showNextImageArrow="index < maxIndex"
        @prevImage="prevImageHandler"
        @nextImage="nextImageHandler"
      />
    </div>
    <SliderNavigationDots
      :imagesCount="maxIndex + 1"
      :currentImageIndex="index"
      @goToImage="goToImageHandler"
    />
  </div>
</template>

<script>
import SliderLikes from "./SliderLikes";
import SliderNavigationArrows from "./SliderNavigationArrows";
import SliderNavigationDots from "./SliderNavigationDots";
import SliderContent from "./SliderContent";
import {
  saveLikesToLocalStorage,
  getLikesFromLocalStorage,
} from "../../helpers";

export default {
  name: "Slider",
  data: () => ({
    index: 0,
    likes: [],
    showHappyImage: false,
    showSadImage: false,
    timeoutID: "",
  }),
  props: {
    sliderHeight: {
      type: Number,
      default: 480,
    },
    images: {
      type: Array,
      required: true,
    },
  },
  computed: {
    maxIndex() {
      return this.images.length - 1;
    },
    indexOfCurrentImageLikes() {
      return this.likes.findIndex(
        (item) => item.id === this.images[this.index].id
      );
    },
  },
  components: {
    SliderLikes,
    SliderNavigationArrows,
    SliderNavigationDots,
    SliderContent,
  },
  watch: {
    likes: {
      deep: true,
      handler(updatedLikes) {
        saveLikesToLocalStorage(updatedLikes);
      },
    },
  },
  methods: {
    dislikeHandler() {
      if (this.likes[this.indexOfCurrentImageLikes].likes > 0) {
        this.likes[this.indexOfCurrentImageLikes].likes = --this.likes[
          this.indexOfCurrentImageLikes
        ].likes;
      }
      this.imageDislikeOverlayHandler();
    },
    likeHandler() {
      const indexOfImage = this.index;
      const indexOfCurrentImageLikes = this.likes.findIndex(
        (item) => item.id === this.images[indexOfImage].id
      );

      this.likes[indexOfCurrentImageLikes].likes = ++this.likes[
        indexOfCurrentImageLikes
      ].likes;
      this.imageLikeOverlayHandler();
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
    imageDislikeOverlayHandler() {
      clearTimeout(this.timeoutID);
      this.showHappyImage = false;
      this.showSadImage = true;
      this.timeoutID = setTimeout(() => (this.showSadImage = false), 500);
    },
    imageLikeOverlayHandler() {
      clearTimeout(this.timeoutID);
      this.showHappyImage = true;
      this.showSadImage = false;
      this.timeoutID = setTimeout(() => (this.showHappyImage = false), 500);
    },
    createLikes() {
      const savedLikes = getLikesFromLocalStorage();

      if (savedLikes.length > 0) {
        // if image path is find in local storage, set likes, otherwise set likes to 0
        this.likes = this.images.map((image) => {
          const indexOfSavedLike = savedLikes.findIndex(
            (item) => item.id === image.id
          );

          return {
            id: image.id,
            likes:
              indexOfSavedLike === -1 ? 0 : savedLikes[indexOfSavedLike].likes,
          };
        });
      } else {
        this.likes = this.images.map((image) => ({
          id: image.id,
          likes: 0,
        }));
      }
    },
  },
  mounted() {
    this.createLikes();
  },
};
</script>

<style lang="scss" scoped>
.slider-container {
  margin-top: 10%;
  width: 100%;
}

.slider {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  position: relative;
}

.slider-image-container {
  width: 80%;
  height: auto;
  display: flex;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

.slider__image {
  width: 100%;
  object-fit: cover;
  position: relative;
}

.image-overlay {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  z-index: 10;
}

.image-overlay__content {
  font-size: 3rem;
  font-weight: 700;
  color: $light-color;
}

.image-overlay--like {
  background: $success-color;
}

.image-overlay--dislike {
  background: $danger-color;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0.2;
}
</style>
