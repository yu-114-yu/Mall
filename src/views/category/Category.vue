<template>
  <div>
    <h2>我是分类</h2>
		<div class="wrapper">
			<ul>
				<li>123</li>
				<li>123</li>
				<li>123</li>
				<li>123</li>
				<li>123</li>
				<li>123</li>
				<li>123</li>
				<li>123</li>
				<li>123</li>
				<li>123</li>
				<li>123</li>
				<li>123</li>
				<li>123</li>
				<li>123</li>
				<li>123</li>
				<li>123</li>
				<li>123</li>
				<li>123</li>
				<li>123</li>
				<li>123</li>
				<li>123</li>
				<li>123</li>
				<li>123</li>
				<li>123</li>
				<li>123</li>
				<li>123</li>
				<li>123</li>
				<li>123</li>
				<li>123</li>
				<li>123</li>
				<li>123</li>
				<li>123</li>
				<li>123</li>
				<li>123</li>
				<li>123</li>
				<li>123</li>
				<li>123</li>
				<li>123</li>
				<li>123</li>
				<li>123</li>
				<li>123</li>
				<li>123</li>
				<li>123</li>
				<li>123</li>
				<li>123</li>
				<li>123</li>
				<li>123</li>
				<li>123</li>
				<li>123</li>
				<li>123</li>
				<li>123</li>
				<li>123</li>
				<li>123</li>
				<li>123</li>
				<li>123</li>
				<li>123</li>
				<li>123</li>
				<li>123</li>
				<li>123</li>
				<li>123</li>
				<li>123</li>
				<li>123</li>
				<li>123</li>
				<li>123</li>
				<li>123</li>
				<li>123</li>
				<li>123</li>
				<li>123</li>
				<li>123</li>
				<li>123</li>
				<li>123</li>
				<li>123</li>
				<li>123</li>
				<li>123</li>
				<li>123</li>
				<li>123</li>
				<li>123</li>
				<li>123</li>
				<li>123</li>
				<li>123</li>
				<li>123</li>
				<li>123</li>
				<li>123</li>
				<li>123</li>
				<li>123</li>
				<li>123</li>
				<li>123</li>
				<li>123</li>
				<li>123</li>
				<li>123</li>
				<li>123</li>
				<li>123</li>
				<li>123</li>
				<li>123</li>
				<li>123</li>
				<li>123</li>
				<li>123</li>
				<li>123</li>
				<li>123</li>
				<li>123</li>
			</ul>
		</div>
		
  </div>
</template>

<script>
	import BScroll from 'better-scroll'
	export default {
		name: 'Category',
		data() {
			return {
				scroll: null
			}
		},
		mounted() {
			this.scroll = new BScroll(document.querySelector('.wrapper'), {
				probeType: 3,
				pullUpLoad: true
			})
			// console.log(this.bscroll);
			this.scroll.on('scroll', (position) => {
				// console.log(position);
			})
			this.scroll.on('pullingUp', () => {
				console.log('上拉加载更多');
				// this.scroll.finishPullUp()
			})
		},
	}
</script>

<style scoped>
	.wrapper{
		height: 200px;
		background: brown;
		color: #009e9d;
		overflow: hidden;
	}
</style>