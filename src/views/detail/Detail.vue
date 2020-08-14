<template>
   <div id="detail">
      <!-- 导航 -->
      <detail-nav-bar @titleClick="titleClick" ref="nav"></detail-nav-bar>
      <scroll class="content" 
              ref="scroll" 
              @scroll="contentScroll" 
              :probeType="3">
        <!-- 轮播图 -->
        <detail-swiper :top-images="topImages"></detail-swiper>
        <!-- 商品基本信息 -->
        <detail-base-info :goods="goods"></detail-base-info>
        <!-- 店铺信息 -->
        <detail-shop-info :shop="shop"></detail-shop-info>
        <!-- 商品的详情数据 -->
        <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
        <!-- 商品的参数数据 -->
        <detail-param-info :param-info="paramsInfo" ref="params"></detail-param-info>
        <!-- 用户的评论数据 -->
        <detail-comment-info :comment-info="commentInfo" ref="comment"></detail-comment-info>
        <!-- 展示推荐 -->
        <goods-list :goods="recommends" ref="recommend"></goods-list>
      </scroll>
      <!-- 底部工具栏 -->
      <detail-bottom-bar @addCart="addToCart"></detail-bottom-bar>

      
      <!-- 回到顶部 -->
			<back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
   </div>
</template>

<script>
  import DetailNavBar from './childComps/DetailNavBar'
  import DetailSwiper from './childComps/DetailSwiper'
  import DetailBaseInfo from './childComps/DetailBaseInfo'
  import DetailShopInfo from './childComps/DetailShopInfo'
  import DetailGoodsInfo from './childComps/DetailGoodsInfo'
  import DetailParamInfo from './childComps/DetailParamInfo'
  import DetailCommentInfo from './childComps/DetailCommentInfo'
  import DetailBottomBar from './childComps/DetailBottomBar'
  
  import Scroll from 'components/common/scroll/Scroll'
  import GoodsList from 'components/content/goods/GoodsList'

  import {getDetail, Goods, Shop, GoodsParam, getRecommend} from 'network/detail'
  import {backTopMixin} from 'common/mixin'

  export default {
    name: 'Detail',
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      Scroll,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      GoodsList,
      DetailBottomBar,
    },
    mixins: [backTopMixin],
    data() {
      return {
        iid: null,
        topImages: [],
        goods: {},
        shop: {},
        detailInfo: {},
        paramsInfo: {},
        commentInfo: {},
        recommends: [],
        themeToYs:[]
      }
    },
    methods: {
      titleClick(index) {
      //  console.log(index);
       this.$refs.scroll.scrollTo(0, -this.themeToYs[index], 200)
      },
      imageLoad() {
        // console.log('接收监听图片加载');
        this.$refs.scroll.refresh()
        
        this.themeToYs = []
        this.themeToYs.push(0);
        this.themeToYs.push(this.$refs.params.$el.offsetTop - 44)
        this.themeToYs.push(this.$refs.comment.$el.offsetTop - 44)
        this.themeToYs.push(this.$refs.recommend.$el.offsetTop - 44)
        // console.log(this.themeToYs);
      },
      contentScroll(position) {
        // console.log(position);
        //1.获取y值
        const positionY = -position.y
        // console.log(position.y);
        // 2. positoinY和主题中值进行对比
        // [0, 7938, 9120， 9452 ]

        //positoinY在0和7938之间，index=0
        // positoinY 在=7938和9120之间，index = 1
        // positoinY 在9120 和9452之间，index = 2
        // positoinY 大于等于9452值，index = 3

        if (positionY > 0 && positionY < this.themeToYs[1]) {
          this.$refs.nav.currentIndex = 0
        } else if (positionY >= this.themeToYs[1] && positionY < this.themeToYs[2]) {
          this.$refs.nav.currentIndex = 1
        } else if (positionY >= this.themeToYs[2] && positionY < this.themeToYs[3]) {
          this.$refs.nav.currentIndex = 2
        } else if (positionY >= this.themeToYs[3]) {
          this.$refs.nav.currentIndex = 3 
        }

        
				// console.log(position);
				//1.判断BackTop是否显示
				this.demo(position)
      },
      addToCart() {
        // console.log('添加购物车');
        //1.获取购物车需要展示的信息
        const product = {}
        product.image = this.topImages[0]
        product.title = this.goods.title
        product.desc = this.goods.desc
        product.price = this.goods.realPrice
        product.iid = this.iid

        //2.将商品添加到购物车里
        this.$store.commit('addCart', product)

        // this.show = true
        // this.message = '加入购物车成功'

        // setTimeout(() => {
        //   this.show = false
        // }, 1500);

        this.$toast.show('加入购物车成功', 1500)
      }
    },
    created() {
      //1.保存传入的iid
      this.iid = this.$route.params.iid
      
      //2.根据iid请求详情数据
      getDetail(this.iid).then(res => {
        // console.log(res);
        //1.获取顶部的图片轮播数据 
        const data = res.result
        this.topImages = data.itemInfo.topImages
        // console.log(this.topImages);

        //2.获取商品信息
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

        //3.获取店铺信息的对象
        this.shop = new Shop(data.shopInfo)
        
        //4.保存商品的详情数据
        this.detailInfo = data.detailInfo

        //5.获取商品参数信息
        this.paramsInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)

        //6.获取评论相关数据
        if(data.rate.cRate !== 0) {
          this.commentInfo = data.rate.list[0]
        }
      })

      //2.请求推荐数据
      getRecommend().then(res => {
        // console.log(res);
        this.recommends = res.data.list
      })
    }
  }
</script>

<style scoped>
  #detail {
    padding-top: 44px;
    position: relative;
    z-index: 18;
    background: #fff;
    height: 100vh;
  }
  
  .content {
    height: calc(100% - 44px);
    overflow: hidden;
    /* position: absolute;
    right: 0;
    left: 0;
    top: 44px;
    bottom: 0px; */
  }
</style>