export default {
  addToCart(context, payload) {
    // let oldproduct = null
    // for(let item of state.cartlist){
    //   if(item.iid === payload.iid){
    //     oldproduct = item;
    //   }
    // }
    // find方法返回符合条件的每一项
    let product = context.state.cartlist.find(function (item) {
      return item.iid === payload.iid
    })
    if (product) {
      // product.count +=1
      context.commit("addCount", product)
    } else {
      payload.count = 1
      // context.state.cartlist.push(payload)
      context.commit("addtoCart", payload)
    }
  }
}