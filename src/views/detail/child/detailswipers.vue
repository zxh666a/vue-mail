<template>
  <div class="container">
    <swiper :options="swiperOption" v-if="swiperitem.length">
      <swiper-slide v-for="item in swiperitem" :key="item.index">
        <img :src="item" alt @load="imageload" />
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
import { swiper, swiperSlide } from "vue-awesome-swiper";

export default {
  name: "swipers",
  data() {
    return {
      swiperOption: {
        pagination: {
          el: ".swiper-pagination",
          clickable: true // 允许点击小圆点跳转
        },
        autoplay: {
          delay: 2000,
          disableOnInteraction: false // 手动切换之后继续自动轮播
        },
        loop: true,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        }
      },
      isload: false
    };
  },
  props: {
    swiperitem: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  components: {
    swiper,
    swiperSlide
  },
  created() {
    // console.log(this.swiperitem)
  },
  methods: {
    imageload() {
      if (!this.isload) {
        this.$emit("swiperimageload");
        this.isload = true;
      }
    }
  }
};
</script>

<style scoped>
.container {
  width: 100%;
  height: 300px;
  overflow: hidden;
}
img {
  width: 100%;
}
</style>