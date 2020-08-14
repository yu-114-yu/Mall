import BackTop from 'components/content/backtop/BackTop'

export const backTopMixin = {
  components: {
    BackTop
  },
  data() {
    return {
      isShowBackTop: false
    }
  },
  methods: {
    backClick() {
      // console.log('回到顶部');
      this.$refs.scroll.scrollTo(0, 0, 500)
    },
    //1.判断BackTop是否显示
    demo(position) {
      this.isShowBackTop = (-position.y) > 1000
    }
  },
}