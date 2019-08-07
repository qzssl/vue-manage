import Vue from 'vue'
import VueRouter from 'vue-router'
import App from '../App.vue'
import Page from '../components/Page.vue'

Vue.use(VueRouter)

const routes = [{ path: '/page', component: Page }]

const router = new VueRouter({
  routes,
  linkActiveClass: 'router-link-active'
})

export default router
