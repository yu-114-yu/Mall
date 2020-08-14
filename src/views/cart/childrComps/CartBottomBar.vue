<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-botton class="check-button" :is-checked="isSelectAll" @click.native="checkClick"></check-botton>
      <span>全选</span>
    </div>
    <div class="price">
      合计:{{totalPrice}}
    </div>
    <div class="calc" @click="calcClick">
      去计算:{{toCalc}}
    </div>
  </div>
</template>

<script>
  import CheckBotton from 'components/content/checkBotton/CheckBotton'

  export default {
    name: 'CartBottomBar',
    components: {
      CheckBotton
    },
    computed: {
      totalPrice () {
        return '￥' + this.$store.state.cartList.filter((item) => {
          return item.checked
        }).reduce((preValue, item) => {
          return  preValue + item.price * item.count
        },0).toFixed(2)
      },
      toCalc() {
        return this.$store.state.cartList.filter((item) => {
          return item.checked
        }).length
      },
      isSelectAll() {
        if (this.$store.state.cartList.length === 0) return false
        // return !this.$store.state.cartList.filter((item) => {
        //   return !item.checked
        // }).length

        // return !this.$store.state.cartList.find((item) => {
        //   return !item.checked
        // })

        let isChecked = false
        for(let item of this.$store.state.cartList) {
          if (!item.checked) {
            return false
          }
        }
        return true
      }
    }, 
    methods: {
      checkClick() {
        if (this.isSelectAll) {//全部选中
          this.$store.state.cartList.forEach(item => {
            item.checked = false
          })
        }else { //部分或全部不选中
          this.$store.state.cartList.forEach(item => {
            item.checked = true
          })
        }
      },
      calcClick() {
        if(!this.toCalc){
          this.$toast.show('还没有选择宝贝呢',1500)
        }
      }
    },
  }
</script>

<style scoped>
  .bottom-bar {
    height: 40px;
    background: #eee;
    position: relative;
    /* bottom: 40px; */
    line-height: 40px;
    display: flex;
  }

  .check-content {
    display: flex;
    align-items: center;
    margin-left: 5px;
  }

  .check-button {
    line-height: 20px;
    margin-right: 5px;
  }

  .price {
    margin-left: 30px;
  }

  .calc {
    margin-left: auto;
    background: #f40;
    color: #fff;
    padding: 0 15px;
  }
</style>