import Vue from 'vue'
import Router from 'vue-router'
import '@/assets/css/reset.css'
import '@/assets/css/header.css'
Vue.use(Router)
import Shop from '@/views/shop'
import Item from '@/views/item'
import Cart from '@/views/cart'
import Checkout from '@/views/checkout'
import Payment from '@/views/payment'
import Account from '@/views/account'
import Order from '@/views/account/order'
import Address from '@/views/account/address'


export default new Router({
	mode: 'history', //路由的history模式！！！ 这种模式充分利用了history.pushState API来完成URL的跳转而不需要重新加载页面。
	routes: [{
			path: '/',
			redirect: '/shop'   //重定向
		},
		{
			path: '/shop',
			name: 'Shop',
			component: Shop
		},
		{
			path: '/item',
			name: 'Item',
			component: Item
		},
		{
			path: '/cart',
			name: 'Cart',
			component: Cart
		},
		{
			path: '/checkout',
			name: 'Checkout',
			component: Checkout
		},
		{
			path: '/payment',
			name: 'Payment',
			component: Payment
		},
		{
			path: '/account',
			component: Account,
			children: [
				{
				path: '',
				name: 'Account',
				component: Order
				},
				{
				  path: '/address',
				  name: 'Address',
				  component: Address
				}
			]
		}
	]
})


// 1， route，它是一条路由，由这个英文单词也可以看出来，它是单数， Home按钮 => home内容， 这是一条route, about按钮 => about 内容， 这是另一条路由。
// 
// 2， routes 是一组路由，把上面的每一条路由组合起来，形成一个数组。[{home 按钮 =>home内容 }， { about按钮 => about 内容}]
// 
// 3， router 是一个机制，相当于一个管理者，它来管理路由。因为routes 只是定义了一组路由，它放在哪里是静止的，当真正来了请求，怎么办？
//  就是当用户点击home 按钮的时候，怎么办？这时router 就起作用了，它到routes 中去查找，去找到对应的 home 内容，所以页面中就显示了 home 内容。
