<template>
  <div>
    <navbar>
      <div slot="left" class="back">
        <img src="../../../img/common/back.svg" alt @click="goback" />
      </div>
      <div slot="center" class="title">
        <div
          v-for="(item,index) in titles"
          :key="index"
          class="title-item"
          :class="{active:index === currentindex}"
          @click="itemclick(index)"
        >{{item}}</div>
      </div>
    </navbar>
  </div>
</template>

<script>
import navbar from "../../../components/navbar/navbar";
export default {
  name: "detailnav",
  data() {
    return {
      titles: ["商品", "参数", "评论", "推荐"],
      currentindex: 0
    };
  },
  components: {
    navbar
  },
  methods: {
    itemclick(index) {
      this.currentindex = index;
      this.$emit("itemclick", index);
    },
    goback() {
      this.$router.go(-1);
    }
  }
};
</script>

<style scoped>
.title {
  display: flex;
  font-size: 15px;
}

.title-item {
  flex: 1;
}

.active {
  color: var(--color-high-text);
}

.back img {
  margin-top: 9px;
  width: 20px;
  height: 20px;
}
</style>