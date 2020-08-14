<template>
  <div class="cart">
    <!-- 导航 -->
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{count}})</div>
    </nav-bar>
    <scroll class="content" ref="scroll">
      <!-- 商品列表 -->
      <cart-list></cart-list>
    </scroll>
    
    <!-- 底部的汇总 -->
    <cart-bottom-bar></cart-bottom-bar>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  import Scroll from 'components/common/scroll/Scroll'

  import CartList from './childrComps/CartList'
  import CartBottomBar from './childrComps/CartBottomBar'

  export default {
    name: 'Cart',
    components: {
      NavBar,
      CartList,
      Scroll,
      CartBottomBar
    },
    computed: {
      count() {
        return this.$store.state.cartList.length
      }
    },
    activated() {
      // console.log('------');
      this.$refs.scroll.refresh()
    },
  }
</script>

<style scoped>
  .cart {
    height: 100vh;
    padding-top: 44px;
  }

  .content {
    height: calc(100% - 44px - 40px);
    overflow: hidden;
  }

  .nav-bar {
    background: var(--color-tink);
    color: #fff;
    font-weight: bold;
  }
</style>