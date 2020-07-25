<template>
	<!-- 所有的item都展示同一个图片,同一个文字 -->
	<div class="tab-bar-item" @click="itemClick">
		<div v-if="!isActive" >
			<slot name="item-icon"></slot>
		</div>
		<div v-else>
			<slot name="item-icon-active"></slot>
		</div>
		<!-- <div :class="isActive ? 'active' : ''">
			<slot name="item-text"></slot>
		</div> -->
		<div :style="activeStyle">
			<slot name="item-text"></slot>
		</div>
		
		<!-- <img src="../../assets/img/tabbar/home.png" alt="">
		<div>首页</div>   -->
	</div> 
</template>

<script>
export default {
	name: "TabBarItem",
	props: {
		path: String,
		activeColor: {
			type: String,
			default: 'red'
		}
	},
	data() {
		return{
			// isActive: false
		}
	},
	computed: {
		isActive() {
			// /home -> item1(/home) = true
			// /home -> item1(/category) = false 
			return this.$route.path.indexOf(this.path) !== -1 //有
		},
		activeStyle() {
			return this.isActive ? {color: this.activeColor} : {}
		}
	},
	methods: {
		itemClick() {
			// console.log(13);
			this.$router.push(this.path)
		}
	}
}
</script>

<style scoped>
	.tab-bar-item {
  	height: 49px;
		text-align: center;
		font-size: 14px;
	}
	.tab-bar-item img {
  	height: 24px;
  	width: 24px;
		margin-top: 3px;
		vertical-align: middle;
		margin-bottom: 2px;
	}
	/* .active{
		color: #ff5777;
	} */
</style>