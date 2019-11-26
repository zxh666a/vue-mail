<template>
<div class="cart">
<navbar class="nav-bar">
  <div slot="center">购物车({{cartLength}})</div>
</navbar>
<cartlist></cartlist>
<cartbottom></cartbottom>
</div>
</template>

<script>
import navbar from "../../components/navbar/navbar"
import cartbottom from  "./child/cartbottom"
import cartlist from "./child/cartlist"
import {mapGetters} from "vuex"
export default {
  name:"shopcar",
  components:{
    navbar,
    cartbottom,
    cartlist
  },
  computed:{
    ...mapGetters(['cartLength'])
    // cartlistlength(){
    //   return this.$store.getters.cartLength
    // }
  }
}
</script>
<style scoped>
    .nav-bar {
    background-color: var(--color-tint);
    color: #fff;
  }
    .cart {
    height: 100vh;
  }
</style>