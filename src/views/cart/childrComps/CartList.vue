<template>
  <div class="cart-list">
    <cart-list-item  v-for="(item,index) in product" :key="index" :product="item"></cart-list-item>
  </div>
  
</template>

<script>
  import CartListItem from './CartListItem'
 
  export default {
    name: 'CartList',
    components: {
      CartListItem
    },
    data() {
      return {
        product: this.$store.state.cartList
      }
    }
  }
</script>

<style scoped>
  
</style>