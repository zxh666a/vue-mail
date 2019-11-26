<template>
  <div class="cart-list">
    <scroll class="content" ref="scroll">
      <cartiem v-for="(item,index) in cartList" :key="index" :itemInfo="item">{{item}}</cartiem>
    </scroll>
  </div>
</template>

<script>
import scroll from "../../../components/scroll/scroll";
import cartiem from "./cartitem";
import { mapGetters } from "vuex";
export default {
  name: "cartlist",
  components: {
    scroll,
    cartiem
  },
  computed: {
    ...mapGetters(["cartList"])
  },
  activated(){
    this.$refs.scroll.refresh()
  }
};
</script>

<style scoped>
.cart-list {
  height: calc(100% - 44px - 49px - 40px);
}
.content {
  height: 100%;
  overflow: hidden;
}
</style>