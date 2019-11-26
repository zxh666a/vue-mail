<template>
  <div class="tab">
    <div v-for="(item,index) in titles" 
    :key="index" 
    class="tabitem" 
    @click="itemclick(index)" 
    :class="{active:index == currentIndex}">
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "tab",
  data() {
    return {
      currentIndex:0
    }
  },
  props: {
    titles: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  methods:{
    itemclick(index){
      this.currentIndex = index
      this.$emit("tabclick",index)
    }
  }
};
</script>

<style scoped>
.tab {
  display: flex;
  font-size: 15px;
  height: 40px;
  text-align: center;
  line-height: 40px;
  background-color: #fff;
}

.tabitem {
  flex: 1;
}

.tabitem span {
  padding: 5px;
}

.active {
  color: var(--color-high-text);
}

.active span {
  border-bottom: 3px solid var(--color-tint);
}
</style>