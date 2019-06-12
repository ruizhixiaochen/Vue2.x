// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import axios from 'axios'
import Toast from './components/toast'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(Toast)

axios.defaults.baseURL = '/spring/'
axios.defaults.headers['Content-Type'] = 'application/json'
Vue.config.productionTip = false
Vue.prototype.$axios = axios

/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	store,
	components: {
		App
	},
	template: '<App/>'
})


router.beforeEach((to, from, next) => {
	// to: Route: 即将要进入的目标 路由对象
	// from: Route: 当前导航正要离开的路由
	// next: Function: 一定要调用该方法来 resolve 这个钩子。执行效果依赖 next 方法的调用参数。

	const nextRoute = ['Checkout', 'Payment', 'Account', 'Address'];
	// 未登录状态；当路由到nextRoute指定页时，跳转至shop
	if (nextRoute.indexOf(to.name) >= 0) {
		if (!store.getters.isLogin) {
			store.state.loginShow = true
			router.push({
				name: 'Shop'
			})
			router.go(-1)
		}
	}
	next()
});

//运行： index.html-> main.js-> App.vue
