<template>
<tabbar>
<!--  首页-->
  <tabbaritem path="/home" activecolor="blue">
    <img src="../../assets/img/tabbar/home.png" alt="" slot="icon">
    <img src="../../assets/img/tabbar/home-s.png" alt="" slot="icon-active">
    <div slot="text">首页</div>
  </tabbaritem>
  <!--  分类-->
  <tabbaritem path="/categroy" activecolor="blue">
    <img src="../../assets/img/tabbar/fenlei.png" alt="" slot="icon">
    <img src="../../assets/img/tabbar/fenlei-s.png" alt="" slot="icon-active">
    <div slot="text">分类</div>
  </tabbaritem>
  <!--  购物车-->
  <tabbaritem path="/shopcar" activecolor="blue">
    <img src="../../assets/img/tabbar/shop.png" alt="" slot="icon">
    <img src="../../assets/img/tabbar/shop-s.png" alt="" slot="icon-active">
    <div slot="text">购物车</div>
  </tabbaritem>
  <!--  我的-->
  <tabbaritem path="/mine" activecolor="blue">
    <img src="../../assets/img/tabbar/wode.png" alt="" slot="icon">
    <img src="../../assets/img/tabbar/wode-s.png" alt="" slot="icon-active">
    <div slot="text">我的</div>
  </tabbaritem>
</tabbar>
</template>

<script>
  import tabbar  from "./tabbar";
  import tabbaritem from "./tabbaritem";
    export default {
        name: "maintabbar",
        components:{
            tabbaritem,
            tabbar
        }
    }
</script>

<style scoped>

</style>