<template>
    <div id="home">
				<!-- 导航 -->
				<nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
				<div style="height: 44px"></div>
				<!-- 轮播图 -->
				<home-swiper :banners="banners"></home-swiper>
				<!-- 推荐 -->
				<recommend-view :recommends="recommends"></recommend-view>
				<!-- 本周流行 -->
				<feature-view></feature-view>
				<!-- 选项卡控制 -->
				<tab-control class="tab-control" :titles="['流行', '推荐', '精选']"  @tabClick="tabClick"></tab-control>
				<!-- 商品展示 -->
				<goods-list :goods="showGoods"></goods-list>


				<ul>
					<li>1</li>
					<li>2</li>
					<li>3</li>	
					<li>4</li>
					<li>5</li>
					<li>6</li>
					<li>7</li>
					<li>8</li>
					<li>9</li>
					<li>10</li>
					<li>10</li>
					<li>10</li>
					<li>10</li>
					<li>10</li>
					<li>10</li>
					<li>10</li>
					<li>10</li>
					<li>10</li>
					<li>10</li>
					<li>10</li>
					<li>10</li>
					<li>10</li>
					<li>10</li>
					<li>10</li>
					<li>10</li>
					<li>10</li>
					<li>10</li>
					<li>10</li>
					<li>10</li>
					<li>10</li>
					<li>10</li>
					<li>10</li>
					<li>10</li>
					<li>10</li>
					<li>10</li>
					<li>10</li>
					<li>10</li>
					<li>10</li>
					<li>10</li>
					<li>10</li>
					<li>10</li>
					<li>10</li>
					<li>10</li>
					<li>10</li>
				</ul>
    </div>
</template>

<script>
	import HomeSwiper from './childComps/HomeSwiper'
	import RecommendView from './childComps/RecommendView'
	import FeatureView from './childComps/FeatureView'
	
	import NavBar from 'components/common/navbar/NavBar'
	import TabControl from 'components/content/tabcontrol/TabControl'
	import GoodsList from 'components/content/goods/GoodsList'

	import {getHomeMultidata, getHomeGoods} from 'network/home'

	export default {
		name: 'Home',
		components: {
			NavBar,
			HomeSwiper,
			RecommendView,
			FeatureView,
			TabControl,
			GoodsList
		},
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
				currentType: 'pop'
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
		methods: {
			/**
			 * 事件监听相关的方法
			 */
			tabClick(index) {
				console.log(index);
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
				})
			}
		},
	}
</script>

<style scoped>
	.home-nav{
		background: var(--color-tink);
		color: #fff;
	}
	
	.tab-control {
		position: sticky;
		top: 44px;
		z-index: 9;
	}
</style>