<template>
  <div class="tab-control">
    <div v-for="(item, index) in titles" 
         :key="index" class="tab-control-item"  
         :class="{active: index ===currentIndex}"
         @click="itemClick(index,item)">
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'TavControl',
    props: {
      titles: {
        type: Array,
        default() {
          return []
        }
      }
    },
    data() {
      return {
        currentIndex: 0
      }
    },
    methods: {
      itemClick(index) {
        // console.log(index);
        this.currentIndex = index
        this.$emit('tabClick', index)
      }
    },
  } 
</script>

<style scoped>
  .tab-control {
    display: flex;
    text-align: center;
    height: 40px;
    line-height: 40px;
    font-size: 15px;
    bottom: 0;
    background: #fff;
  }

  .tab-control-item {
    flex: 1;
  }
  
  .active {
    color: var(--color-hight-text); 
  }
  .active span{
    border-bottom: 3px solid var(--color-tink);
    padding: 5px;
  }
</style>