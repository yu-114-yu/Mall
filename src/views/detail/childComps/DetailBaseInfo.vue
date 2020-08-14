<template>
  <div class="base-info" v-if="Object.keys(goods).length !== 0"> 
    <div class="info-title">{{goods.title}}</div>
    <div class="info-price">
      <span class="n-price">{{goods.newPrice}}</span>
      <span class="o-price">{{goods.oldPrice}}</span>
      <span class="discount" v-if="goods.discount">{{goods.discount}}</span>
    </div>
    <div class="info-other">
      <span>{{goods.columns[0]}}</span>
      <span>{{goods.columns[1]}}</span>
      <span>{{goods.services[0].name}}</span>
    </div>
    <div class="info-service">
      <span class="info-service-item" v-for="index in goods.services.length-1" :key="index">
        <img :src="goods.services[index].icon">
        <span>{{goods.services[index].name}}</span>
      </span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'DetaiBaseInfo',
    props: {
      goods: {
        type: Object,
        default() {
          return {}
        }
      }
    }
  }
</script>

<style scoped>
  .base-info {
    margin-top: 15px;
    padding: 0 8px;
    color: #999;
    border-bottom: 5px solid #f2f5f8;
    
  }

  .info-title {
    color: #222;
    font-size: 20px;
  }

  .info-price {
    margin-top: 10px;
  }

  .info-price .n-price {
    font-size: 24px;
    color: var(--color-hight-text);
  }

  .info-price .o-price {
    font-size: 15px;
    margin-left: 13px;
    text-decoration: line-through;
  }

  .info-price .discount {
    margin-left: 13px;
    border: 1px solid;
    border-radius: 7px;
    padding: 4px;
    background: var(--color-hight-text);
    color: #fff;
    font-size: 15px;
  }
  
  .info-other {
    display: flex;
    justify-content: space-between;
    margin-top: 15px;
    border-bottom: 1px solid #ccc;
    padding-bottom: 10px;
    font-size: 13px;
  }

  .info-service {
    margin-top: 15px;
    font-size: 14px;
    display: flex;
    justify-content: space-between;
    color: #222;
    padding-bottom: 15px;
  }

  .info-service img{
    width: 16px;
    height: 16px;
    vertical-align: bottom;
  }
</style>