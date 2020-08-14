import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cartList: []
  },
  mutations: {
    addCart(state, payload) {
      // mutations唯的目的就是修改state中状态
      // mutations中的每个方法尽可能完成的事件比较单一一点

      return new Promise((resolve, reject) => {
        //payload新添加的商品
        //1.查找之前的数组中是否有
        let oldProduct =  state.cartList.find(item => item.iid === payload.iid)
        payload.checked = false
        //2.判断oldProduct
        if (oldProduct) {
          oldProduct.count += 1
        } else {
          payload.count = 1
          state.cartList.push(payload)
        }
      })
      
    }
  },
  actions: {
  },
  modules: {
  }
})
