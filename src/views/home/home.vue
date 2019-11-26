<template>
  <div id="home">
    <navbar class="home-nav">
      <div slot="center" class="navbar">NMSL潮品街</div>
    </navbar>
    <tab  :titles="['流行','新款','精选']" 
          @tabclick="itemclick" 
          ref="tab2" 
          class="tabc" 
          v-show="isfixed"></tab>
    <scroll
      class="content"
      @pullingUp="loadmore"
      :pull-up-load="true"
      :probe-type="3"
      @scroll="contentscroll"
      ref="scroll">
      <swipers  :swiperitem="banners" 
                @swiperimageload="swiperload"></swipers>
      <recommend :recommend="recommends"></recommend>
      <feature></feature>
      <tab  :titles="['流行','新款','精选']" 
            @tabclick="itemclick" 
            ref="tab1"></tab>
      <goodslist :goodslist="showgoods"></goodslist>
    </scroll>
    <backtop v-show="isshowbacktop" @click.native="backtop"></backtop>
  </div>
</template>

<script>
import navbar from "../../components/navbar/navbar";
import swipers from "../../components/swiper/swipers";
import recommend from "./childe/recommendview";
import feature from "./childe/featureview";
import tab from "../../components/tab/tab";
import goodslist from "../../components/goods/goods";
import scroll from "../../components/scroll/scroll";
import backtop from "../../components/backtop/backtop";

import { getHomedata, getgoods } from "../../network/home";
export default {
  name: "Home",
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] }
      },
      currenType: "pop",
      isshowbacktop: false,
      taboffsettop: 0,
      isfixed: false,
      saveY:0
    };
  },
  components: {
    navbar,
    swipers,
    recommend,
    feature,
    tab,
    goodslist,
    scroll,
    backtop
  },

  computed: {
    showgoods() {
      return this.goods[this.currenType].list;
    }
  },

  created() {
    this.getHome();
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  mounted() {
    // const refresh = this.debounce(this.$refs.scroll.refresh, 500);
    // this.$bus.$on("itemimageload", () => {
    //   refresh();
    // });

    this.$bus.$on("itemimageload", () => {
      this.$refs.scroll.refresh();
    });
  },

  methods: {
    swiperload() {
      this.taboffsettop = this.$refs.tab1.$el.offsetTop;
    },

    debounce(func, delay) {
      let timer = null;
      return function(...args) {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
          func.apply(this, args);
        }, delay);
      };
    },
    getHome() {
      //获取数据
      getHomedata().then(res => {
        // console.log(res.data);
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    //商品列表
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getgoods(type, page).then(res => {
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;
        this.$refs.scroll.finishPullUp();
      });
    },
    //加载更多
    loadmore() {
      this.getHomeGoods(this.currenType);
    },
    itemclick(index) {
      switch (index) {
        case 0:
          this.currenType = "pop";
          break;
        case 1:
          this.currenType = "new";
          break;
        case 2:
          this.currenType = "sell";
          break;
      }

      this.$refs.tab1.currentIndex = index;
      this.$refs.tab2.currentIndex = index
    },
    //监听滚动
    contentscroll(positon) {
      //决定是否吸顶
      this.isfixed = -positon.y > this.taboffsettop;
      // console.log(positon)
      this.isshowbacktop = -positon.y > 1000;
    },
    //返回顶部
    backtop() {
      this.$refs.scroll.scrollTo(0, 0, 300);
    }
  },
  //离开时记录位置
  activated(){
    console.log(this.saveY)
    this.$refs.scroll.scrollTo(0,this.saveY,2)
    this.$refs.scroll.refresh()
  },
  //记录离开的位置
  deactivated() {
    this.saveY = this.$refs.scroll.getScrollY();
        this.$bus.$off("itemimageload", () => {
      this.$refs.scroll.refresh();
    });
  },
}; 
</script>
<style scoped>
.home-nav {
  background-color: var(--color-tint);
  color: #fff;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9;
}
#home {
  padding-top: 44px;
  height: 100vh;
  position: relative;
}
.content {
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
.tabc {
  position: relative;
  z-index: 9;
}
</style>