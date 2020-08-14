<template>
  <div>
    <div id="shop-item">
      <div class="item-selector" >
        <check-botton :is-checked="product.checked" @click.native="checkClick"></check-botton>
      </div>
      <div class="item-img">
        <img :src="product.image" alt="商品图片">
      </div>
      <div class="item-info">
        <div class="item-title">{{product.title}}</div>
        <div class="item-desc">{{product.desc}}</div>
        <div class="info-bottom">
          <div class="item price left">￥{{product.price}}</div>
          <div class="item count right">x{{product.count}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import CheckBotton from 'components/content//checkBotton/CheckBotton'

  export default {
    name: 'CartListItem',
    components: {
      CheckBotton
    },
    props: {
      product: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    data() {
      return {
      }
    },
    computed: {

    },
    methods: {
      checkClick() {
        // console.log(123);
        this.product.checked = !this.product.checked
      }
    },
  }
</script>

<style scoped>
  #shop-item {
    width: 100%;
    display: flex;
    padding: 5px;
    border-bottom: 1px solid #ccc;
  }

  .item-selector {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .item-img {
    padding: 5px;
  }

  .item-img img{
    width: 80px;
    height: 100px;
    border-radius: 5px;
  }

  .item-info {
    font-size: 17px;
    color: #333;
    padding: 5px 10px;
    overflow: hidden;
  }

  .item-info .item-desc{
    font-size: 14px;
    color: #666;
    margin-top: 15px;
  }

  .item-title, .item-desc {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .info-bottom {
    margin-top: 25px;
  }

  .info-bottom .price{
    color: orangered;
  }
</style>