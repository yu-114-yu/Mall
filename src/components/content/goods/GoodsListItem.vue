<template>
  <div class="goods-item">
    <img :src="goodsItem.show.img" alt="">
    <div class="goods-info">
      <p>{{goodsItem.title}}</p>
      <span class="price">{{goodsItem.price}}</span>
      <span class="collect">{{goodsItem.cfav}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'GoodListItem',
    props: {
      goodsItem: {
        type: Object,
        default() {
          return {}
        }
      }
    }
  }
</script>

<style scoped>
  .goods-item{
    width: 48%;
    position: relative;
    padding-bottom: 40px;
  }

  .goods-item img{
    width: 100%;
    border-radius: 5px;
  }

  .goods-info{
    font-size: 12px;
    text-align: center;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 5px;
    /* overflow: hidden; */
  }
  
  .goods-info p{
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-bottom: 3px;
  }

  .goods-info .price{
    color: var(--color-hight-text);
    margin-right: 20px;
  }

  .goods-info .collect{
    position: relative;
  }

  .goods-info .collect::before{
    content: '';
    background: url('~assets/img/common/favor.png') 0 0/14px 14px;
    width: 14px;
    height: 14px;
    position: absolute;
    left: -15px;
    top: -1px;
  }
</style>