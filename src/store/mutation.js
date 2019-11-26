export default {
  //mutations唯一的目的修改state中的状态  但是每个方法尽可能完成事情单一一点  这是可以写在actions中
  addCount(state, playload) {
    playload.count++
  },
  addtoCart(state, playload) {
    //选中与不选择的切换属性
    // playload.checked = true
    state.cartlist.push(playload)
  }
}