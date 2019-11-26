<template>
  <div id="detail">
    <navbar class="detail-nav" @itemclick="navclick" ref="nav"></navbar>
    <scroll class="content" ref="scroll" @scroll="contentscroll" :probe-type="3">
      <swiper :swiperitem="topimages"></swiper>
      <goodsdetail :goods="goods"></goodsdetail>
      <shop :shop="shop"></shop>
      <goodsinfo :detail-info="detailInfo" @imageload="imgload" ref="goodsinfo"></goodsinfo>
      <params :paramInfo="paramsInfo" ref="params"></params>
      <commoninfo :commentInfo="commentInfo" ref="commoninfo"></commoninfo>
      <goodslist :goodslist="recommends" ref="goodslist"></goodslist>
    </scroll>
    <backtop v-show="isshowbacktop" @click.native="itemclick"></backtop>
    <bottombar class="bottombar" @addCart="addToCart"></bottombar>
  </div>
</template>

<script>
import scroll from "../../components/scroll/scroll";
import navbar from "../detail/child/detailnav";
import swiper from "../detail/child/detailswipers";
import goodsdetail from "../detail/child/detailinfo";
import shop from "../detail/child/detailshopinfo";
import bottombar from "../detail/child/detailbottom";
import goodsinfo from "../detail/child/detailgoodsinfo";
import params from "../detail/child/detailparamsinfo";
import commoninfo from "../detail/child/dettailcommoninfo";
import goodslist from "../../components/goods/goods";
import backtop from "../../components/backtop/backtop";

import {
  getdetail,
  Goods,
  Shop,
  GoodsParam,
  getrecommend
} from "../../network/detail";
export default {
  name: "detail",
  data() {
    return {
      iid: null,
      topimages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramsInfo: {},
      commentInfo: {},
      recommends: [],
      topy: [],
      currentIndex: 0,
      isshowbacktop: false,
      gettopy: null
    };
  },
  components: {
    swiper,
    navbar,
    scroll,
    goodsinfo,
    shop,
    bottombar,
    goodsdetail,
    params,
    commoninfo,
    goodslist,
    backtop,
  },
  created() {
    //保存商品的iid
    this.iid = this.$route.params.iid;
    //获取商品的信息
    getdetail(this.iid).then(res => {
      const data = res.result;
      // console.log(data);
      //获取顶部轮播图
      this.topimages = data.itemInfo.topImages;
      // 获取商品信息
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );
      //店铺信息
      this.shop = new Shop(data.shopInfo);
      //详情页的图片
      this.detailInfo = data.detailInfo;
      //尺码信息
      this.paramsInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );
      //获取评论信息
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0];
      }
      //获取offsetTop
      this.gettopy = this.debounce(() => {
        this.topy = [];
        this.topy.push(0);
        this.topy.push(this.$refs.params.$el.offsetTop);
        this.topy.push(this.$refs.commoninfo.$el.offsetTop);
        this.topy.push(this.$refs.goodslist.$el.offsetTop);
        this.topy.push(Number.MAX_VALUE);
      });
    });
    //获取推荐信息
    getrecommend().then(res => {
      // console.log(res);
      this.recommends = res.data.list;
      // console.log(this.recommends);
    });
  },
  methods: {
    //点击滚动到对应的位置
    navclick(index) {
      this.$refs.scroll.scrollTo(0, -this.topy[index], 300);
    },
    //监听滚动
    contentscroll(position) {
      //nav随着内容滚动而变换
      const positionY = -position.y;
      let length = this.topy.length;
      for (let i = 0; i < length - 1; i++) {
        if (
          this.currentIndex !== i &&
          (positionY >= this.topy[i] && positionY < this.topy[i + 1])
        ) {
          this.currentIndex = i;
          this.$refs.nav.currentindex = this.currentIndex;
        }
      }

      // console.log(position)
      this.isshowbacktop = -position.y > 1000;
    },
    //回到顶部
    itemclick() {
      this.$refs.scroll.scrollTo(0, 0, 200);
    },
    imgload() {
      // console.log("----");
      this.$refs.scroll.refresh();
      this.gettopy();
    },
    debounce(func, delary) {
      let timer = null;
      return function(...args) {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
          func.apply(this, args);
        }, delary);
      };
    },
    addToCart() {
      // console.log("11111")
      const product = {};
      product.image = this.topimages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.realPrice;
      product.iid = this.iid;
      // product.count = 1
      // console.log(product)
      // 
      this.$store.dispatch("addCart", product).then(res=>{
        console.log(res)
        this.$toast.show(res, 200);
        // this.$
      });
    }
  },
  computed: {}
};
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}

.detail-nav {
  position: relative;
  z-index: 9;
  background-color: #fff;
}

.content {
  height: calc(100% - 44px - 49px);
  overflow: hidden;
}
</style>