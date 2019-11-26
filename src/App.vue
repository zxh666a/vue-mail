<template>
  <div id="app">
    <keep-alive exclude="detail">
        <router-view></router-view>
    </keep-alive>
  <maintabbar></maintabbar>
  </div>
</template>

<script>
import maintabbar from "./components/tabbar/maintabbar";

export default {
  name: 'app',
  components: {
   maintabbar
  }
}
</script>

<style>
@import 'assets/css/base.css'
</style>
