// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
// import router from './router'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import goods from './components/goods/goods'
import seller from './components/seller/seller'
import ratings from './components/ratings/ratings'
Vue.config.productionTip = false


Vue.use(VueRouter)
Vue.use(VueResource)
const Goods = {template: '<div>goods</div>'}
const routes = [
	{path:'/',redirect: '/goods'}, 
	{path:'/goods',component:goods},
	{path:'/ratings',component:ratings},
	{path:'/seller',component:seller}
];
const router = new VueRouter({
	routes,
	linkActiveClass:'active'
});
router.push('/goods');
const app = new Vue({
	router
}).$mount('#app');

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
});
