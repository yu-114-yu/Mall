<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
        <slot></slot>
    </div>
  </div>
</template>

<script>
  import BSroll from 'better-scroll'

  export default {
    name: 'Scroll',
    props: {
      probeType: {
        type: Number,
        default: 0
      },
      pullUpLoad: {
        type: Boolean,
        defutlt: false
      }
    },
    data() {
      return {
        _scroll: null
      }
    }, 
    mounted() {
      //1.创建BScroll对象
      this._scroll = new BSroll(this.$refs.wrapper, {
        click: true,
        probeType: this.probeType,
        pullUpLoad: this.pullUpLoad
      })

      //2.监听滚动位置
      if (this.probeType === 2 || this.probeType === 3) {
        this._scroll.on('scroll', (position) => {
          // console.log(position);
          this.$emit('scroll', position)
        })
      } 
      
      //3.监听上拉事件
      if(this.pullUpLoad) {
        this._scroll.on('pullingUp', () => {
          // console.log('监听滚动到底部');
          this.$emit('pullingUp')
        })
      }
    },
    methods: {
      scrollTo(x, y, time=300) {
        this._scroll && this._scroll.scrollTo(x, y, time)
      },
      finishPullUp() {
        this._scroll && this._scroll.finishPullUp()
      },
      refresh() {
        // console.log('-----------------');
        this._scroll && this._scroll.refresh()
      },
      getScrollY() {
        return this._scroll ? this._scroll.y : 0
      }
    },
  }
</script>

