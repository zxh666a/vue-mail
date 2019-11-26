import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store/index'
import toast from './components/toast/index'
import fast from "fastclick"
import lazy from "vue-lazyload"
//轮播图
import vueswiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
Vue.use(vueswiper)
Vue.use(toast)
Vue.use(lazy)

fast.attach(document.body)


//事件总线
Vue.prototype.$bus = new Vue()
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  vueswiper,
  store
}).$mount('#app')
