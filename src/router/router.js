import Vue from "vue"
import VueRouter from "vue-router"

const Home = () => import("../views/home/home");
const Categroy = () => import("../views/fenlei/fenlei");
const Shopcar = () => import("../views/shopcar/car");
const Mine = () => import("../views/wode/wode");
const Detail = () => import("../views/detail/Detail")

const routes = [{
        path: "/",
        redirect: "/home"
    },
    {
        path: "/home",
        component: Home
    },
    {
        path: "/categroy",
        component: Categroy
    },
    {
        path: "/shopcar",
        component: Shopcar
    },
    {
        path: "/mine",
        component: Mine
    },
    {
        path: "/detail:iid",
        component: Detail
    }
];
Vue.use(VueRouter)

const router = new VueRouter({
    routes,
    mode: "history"
});

export default router