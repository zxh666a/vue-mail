import vue from "vue"
import vuex from "vuex"

// import action from "./actions"
// import getter from "./getter"
// import mutations from "./mutation"

vue.use(vuex)

// const state = {
//   cartlist:[]
// }

const store = new vuex.Store({
  state: {
    cartlist: []
  },
  // mutations,
  // action,
  // state
  getters: {
    cartLength(state) {
      return state.cartlist.length;
    },
    cartList(state) {
      return state.cartlist;
    }
  },
  mutations: {
    addcount(state, payload) {
      payload.count++
    },
    addCart(state, payload) {
      payload.checked = true
      state.cartlist.push(payload)
    }
  },
  actions: {
    addCart(context, payload) {
      // let oldproduct = null
      // for(let item of state.cartlist){
      //   if(item.iid === payload.iid){
      //     oldproduct = item;
      //   }
      // }
      // find方法返回符合条件的每一项
      // let product = context.state.cartlist.find(function (item) {
      //   return item.iid === payload.iid
      // })
      // if (product) {
      //   // product.count +=1
      //   context.commit("addcount", product)
      // } else {
      //   payload.count = 1
      //   // context.state.cartlist.push(payload)
      //   context.commit("addCart", payload)
      // }
      // eslint-disable-next-line no-unused-vars
      return  new Promise((resolve, reject) => {
        let product = context.state.cartlist.find(function (item) {
          return item.iid === payload.iid
        })
        if (product) {
          // product.count +=1
          context.commit("addcount", product)
          resolve("数量+1")
        } else {
          payload.count = 1
          // context.state.cartlist.push(payload)
          context.commit("addCart", payload)
          resolve("添加成功")
        }
      })
    }
  }
})

export default store