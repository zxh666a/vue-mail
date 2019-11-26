 <template>
  <div class="bottom-bar">
    <div class="check-content">
      <checkbutton :is-checked="isall" @click.native="checklcick"></checkbutton>
      <span>全选</span>
    </div>
    <div class="price">
      合计：{{totalPrice}}
    </div>
    <div class="calculate">
      去计算({{checkedlength}})
    </div>
  </div>
</template>

<script>
import checkbutton from "../../../components/checkbutton/checkbutton"
export default {
  name:"cartbottom",
  components:{
    checkbutton
  },
  methods:{
    checklcick(){
      if(this.isall){//全不选
        this.$store.getters.cartList.forEach(item => item.checked = false);
      }else{//全选
        this.$store.getters.cartList.forEach(item => item.checked = true);
      }
    }
  },
  computed:{
    totalPrice(){
      return "￥"+this.$store.getters.cartList.filter(item=>{
        return item.checked
      }).reduce((preValue,item)=>{
        return preValue + item.price *item.count
      },0)
    },
    checkedlength(){
      return this.$store.getters.cartList.filter(item => item.checked).length
    },
    isall(){
    // return !this.$store.getters.cartList.filter(item => !item.checked).length
  if(this.$store.getters.cartList.length === 0) return false
    return !this.$store.getters.cartList.find(item => !item.checked)

}
  }
}
</script>

<style scoped>

  .bottom-bar {
    /* bottom: 40px; */
    position: relative;
    height: 40px;
    line-height: 40px;
    background-color: #eee;
    display: flex;
    font-size: 15px;
  }

  .check-content {
    display: flex;
    align-items: center;
    margin-left: 10px;
    width: 60px;
  }

  .check-button {
    width: 20px;
    height: 20px;
    line-height: 20px;
    margin-right: 5px;
  }

  .price {
    margin-left: 20px;
    flex: 1;
  }

  .calculate {
    width: 90px;
    background-color: red;
    color: #eee;
    text-align: center;
  }

</style>
