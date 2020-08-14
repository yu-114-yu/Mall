<template>
    <div id="home">
				<!-- 导航 -->
				<nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>

				<tab-control  class="tab-control" 
											:titles="['流行', '推荐', '精选']" 
											@tabClick="tabClick" 
											ref="tabControl1"
											v-show="isTabFixed">
				</tab-control>

				<scroll class="content" 
								ref="scroll" 
								:probe-type="3"
								@scroll="contentScroll" 
								:pull-up-load="true"
								@pullingUp="loadMore">
					<!-- 轮播图 -->
					<home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
					<!-- 推荐 -->
					<recommend-view :recommends="recommends"></recommend-view>
					<!-- 本周流行 -->
					<feature-view></feature-view>
					<!-- 选项卡控制 -->
					<tab-control :titles="['流行', '推荐', '精选']" 
											 @tabClick="tabClick" 
											 ref="tabControl2">
					</tab-control>
					<!-- 商品展示 -->
					<goods-list :goods="showGoods"></goods-list>
				</scroll>
				<!-- 回到顶部 -->
				<back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
    </div>
</template>

<script>
	import HomeSwiper from './childComps/HomeSwiper'
	import RecommendView from './childComps/RecommendView'
	import FeatureView from './childComps/FeatureView'
	
	import NavBar from 'components/common/navbar/NavBar'
	import Scroll from 'components/common/scroll/Scroll'
	import TabControl from 'components/content/tabcontrol/TabControl'
	import GoodsList from 'components/content/goods/GoodsList'
	import BackTop from 'components/content/backtop/BackTop'

	import {getHomeMultidata, getHomeGoods} from 'network/home'
	import {debounce} from 'common/utils'
	import {backTopMixin} from 'common/mixin'

	export default {
		name: 'Home',
		components: {
			NavBar,
			HomeSwiper,
			RecommendView,
			FeatureView,
			TabControl,
			GoodsList,
			Scroll,
		},
		mixins: [backTopMixin],
		computed: {
			showGoods() {
				return this.goods[this.currentType].list
			}
		},
		data() {
			return{
				// result: null,
				banners: [],
				recommends: [],
				goods: {
					'pop' : {page: 0, list:[]},
					'new' : {page: 0, list:[]},
					'sell' : {page: 0, list:[]}
				},
				currentType: 'pop',
				tabOffsetTop: 0,
				isTabFixed: false,
				saveY: 0
			}
		},
		created() {
			//1.请求多个数据
			this.getHomeMultidata()
			//2.请求多个数据
			this.getHomeGoods('pop')
			this.getHomeGoods('sell')
			this.getHomeGoods('new')

			
		},
		mounted() {
			//1.图片加载完的事件监听
			//这个地方img标签确实被挂载，但是其中的图片还没有占据高度
			// this.$refs.scroll.refresh对这个函数进行防抖操作
			const refresh = debounce(this.$refs.scroll.refresh, 200)
			this.$bus.$on('itemImageLoad', () => {
				// console.log('监听item中图片加载完成');
				refresh()
			})
		},
		destroyed() {
			// console.log('销毁');
		},
		activated() {
			// console.log('进入');
			this.$refs.scroll.scrollTo(0, this.saveY, 0)
			this.$refs.scroll.refresh()
		},
		deactivated() {
			// console.log('离开');
			this.saveY = this.$refs.scroll.getScrollY()
			// console.log(this.saveY);
		},
		methods: {
			/**
			 * 事件监听相关的方法
			 */
			loadMore() {
				// console.log('加载更多的方法');
				this.getHomeGoods(this.currentType)
			},
			swiperImageLoad() {
				//2.获取tabControl的offsetTop
				// console.log(this.$refs.tabControl.$el.offsetTop);
				this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
			},
			tabClick(index) {
				// console.log(index);
				switch (index) {
					case 0:
						this.currentType = 'pop'
						break;
					case 1:
						this.currentType = 'new'
						break;
					case 2:
						this.currentType = 'sell'
						break;
				}
				//让两个TabControl的currentIndex保持致
				this.$refs.tabControl1.currentIndex = index
				this.$refs.tabControl2.currentIndex = index
			},
			backClick() {
				// console.log('回到顶部');
				this.$refs.scroll.scrollTo(0, 0, 500)
			},
			contentScroll(position) {
				// console.log(position);
				//1.判断BackTop是否显示
				this.demo(position)

				//2.决定tabControl是否吸顶(position:fixed)
				this.isTabFixed = (-position.y) > this.tabOffsetTop
			},
			/**
			 * 网路请求相关的方法
			 */
			getHomeMultidata() {
				getHomeMultidata().then(res => {
					// console.log(res);
					// this.result = res
					this.banners = res.data.banner.list
					this.recommends = res.data.recommend.list
				})
			},
			getHomeGoods(type) {
				const page = this.goods[type].page + 1
					// console.log(page)
				getHomeGoods(type, page).then(res => {
					// console.log(res)
					this.goods[type].list.push(...res.data.list)
					this.goods[type].page += 1

					//完成上拉加载更多
					this.$refs.scroll.finishPullUp()
				})
			}
		},
	}
</script>

<style scoped>
	#home {
		padding-top: 44px;
		height: 100vh;
		position: relative;
	}

	.home-nav {
		background: var(--color-tink);
		color: #fff;
	}
	
	.tab-control {
		position: relative;
		z-index: 9;
	}

	.content {
		overflow: hidden;
		position: absolute;
		top: 44px;
		bottom: 49px;
		left: 0;
		right: 0;
	}

	/* .content {
		height: calc(100% - 44px + 49px);
		overflow: hidden;
		margin-top: 44px;
	} */

</style>