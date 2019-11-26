import {request} from "./request"

export function getdetail(iid){
  return request({
    url:"/detail",
    params:{
      iid
    }
  })
}

export function getrecommend(){
  return request({
    url:"/recommend"
  })
}
//商品信息
export class Goods{
  constructor(itemInfo,columns,services){
    this.title = itemInfo.title
    this.desc = itemInfo.desc
    this.newPrice = itemInfo.price
    this.oldPrice = itemInfo.oldPrice
    this.discount = itemInfo.discountDesc
    this.discountBgColor = itemInfo.discountBgColor
    this.columns = columns
    this.services = services
    this.realPrice = itemInfo.lowNowPrice
  }
}
//店铺信息
export class Shop{
  constructor(shopInfo){
    this.slogo = shopInfo.shopLogo
    this.sname = shopInfo.name
    this.fans = shopInfo.cFans
    this.goodsnum = shopInfo.cGoods
    this.sell = shopInfo.cSells
    this.score = shopInfo.score
  }
}

export class GoodsParam {
  constructor(info, rule) {
    this.image = info.images ? info.images[0] : '';
    this.infos = info.set;
    this.sizes = rule.tables;
  }
}