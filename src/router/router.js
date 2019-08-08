import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

//import UserList from '../components/datasheets/UserList.vue'
//路由被访问时才加载对应组件，提高加载效率,就是把import进来的组件定义成异步组件,即懒加载
const home = () =>
  import(/* webpackChunkName:"homepage"*/ '../components/home/Home.vue')
const userList = () =>
  import(
    /* webpackChunkName:"datasheets" */ '../components/datasheets/UserList.vue'
  )
const shopList = () =>
  import(
    /* webpackChunkName:"datasheets"*/ '../components/datasheets/ShopList.vue'
  )
const orderList = () =>
  import(
    /* webpackChunkName:"datasheets" */ '../components/datasheets/OrderList.vue'
  )
const goodsList = () =>
  import(
    /* webpackChunkName:"datasheets"*/ '../components/datasheets/GoodsList.vue'
  )
const adminList = () =>
  import(
    /* webpackChunkName:"datasheets" */ '../components/datasheets/AdminList.vue'
  )
const addGoods = () =>
  import(/* webpackChunkName:"increase"*/ '../components/increase/AddGoods.vue')
const addShop = () =>
  import(/* webpackChunkName:"increase" */ '../components/increase/AddShop.vue')
const setting = () =>
  import(/* webpackChunkName:"setting"*/ '../components/setting/Setting.vue')
const textEdit = () =>
  import(
    /* webpackChunkName:"textedit" */ '../components/textedit/TextEdit.vue'
  )
const explain = () =>
  import(/* webpackChunkName:"explain"*/ '../components/explain/Explain.vue')
const chart = () =>
  import(/* webpackChunkName:"chart"*/ '../components/chart/Chart.vue')

const routes = [
  {
    path: '/home',
    component: home,
    meta: {}
  },
  {
    path: '/userList',
    component: userList,
    meta: { title: '数据管理', subtitle: '用户列表' }
  },
  {
    path: '/shopList',
    component: shopList,
    meta: { title: '数据管理', subtitle: '商家列表' }
  },
  {
    path: '/goodsList',
    component: goodsList,
    meta: { title: '数据管理', subtitle: '食品列表' }
  },
  {
    path: '/orderList',
    component: orderList,
    meta: { title: '数据管理', subtitle: '订单列表' }
  },
  {
    path: '/adminList',
    component: adminList,
    meta: { title: '数据管理', subtitle: '管理员列表' }
  },
  {
    path: '/addShop',
    component: addShop,
    meta: { title: '添加数据', subtitle: '添加商铺' }
  },
  {
    path: '/addGoods',
    component: addGoods,
    meta: { title: '添加数据', subtitle: '添加商品' }
  },
  {
    path: '/chart',
    component: chart,
    meta: { title: '图表', subtitle: '用户分布' }
  },
  {
    path: '/textEdit',
    component: textEdit,
    meta: { title: '编辑', subtitle: '文本编辑' }
  },
  {
    path: '/setting',
    component: setting,
    meta: { title: '设置', subtitle: '管理员设置' }
  },
  {
    path: '/explain',
    component: explain,
    meta: { title: '说明', subtitle: '说明' }
  }
]

const router = new VueRouter({
  mode: 'history', //
  routes,
  linkActiveClass: 'router-link-active'
})

export default router
