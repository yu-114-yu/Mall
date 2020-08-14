<template>
  <div class="goods-info" v-if="Object.keys(detailInfo).length !== 0">
    <div class="info-desc clear-fix">
      <div class="start">______________</div>
      <div class="desc">{{detailInfo.desc}}</div>
      <div class="end">______________</div>
    </div>
    <div class="info-key">{{detailInfo.detailImage[0].key}}</div>
    <div class="info-list">
      <img v-for="(item, index) in detailInfo.detailImage[0].list" 
           :key="index" 
           :src="item"
           @load="imgLoad">
    </div>
  </div>
</template>

<script>
  export default {
    name: 'DetailGoodsINfo',
    props: {
      detailInfo: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    data() {
      return {
        counter: 0,
        imagesLength: 0
      }
    },
    methods: {
      imgLoad() {
        //判断,所以的图片都加载完了,那么进行一次回调就可以
       
        if (++this.counter === this.imagesLength) {
          // console.log('图片加载完');
          this.$emit('imageLoad')
        }
      }
    },
    watch: {
      detailInfo() {
        //获取图片的个数
        this.imagesLength = this.detailInfo.detailImage[0].list.length
      }
    },
  }
</script>

<style scoped>
  .goods-info {
    padding: 20px 0; 
    border-bottom: 5px solid #f2f5f8; 
  }

  .info-desc {
    padding: 0 8px;
  }

  .info-desc .start{
    /* float: left; */
    margin-bottom: 10px;
  }

  .info-desc .end{
    float: right;
  }

  .info-key {
    margin: 10px 0;
    padding: 0 8px;
    font-size: 18px;
    color: #666;
  }

  .info-list img{
    width: 100%;
  }
</style>