//定义好后再main.js里引入
import Vue from 'vue'
import Vuex from 'Vuex'
import axios from 'axios'

Vue.use(Vuex)

let store = new Vuex.Store({
	state: { //如果在实例创建之后添加新的属性到实例上，它不会触发视图更新
		carPanelData: [],
		orderData: [],
		receiveInfo: [],
		maxOff: false,
		carShow: false,
		CarTime: null,
		loginShow: false,
		ball: {
			show: false,
			el: null,
			img: ''
		},
		editCheck: false,
		editIndex: 0,
		isLogin: false, // 登录状态
		currentUser: null
	},
	getters: { //getters 是属性，不是方法，直接访问，而不是用方法的调用方式
		currentUser: state => state.currentUser,
		isLogin: state => state.isLogin,
		totleCount(state) {
			let count = 0
			state.carPanelData.forEach((goods) => {
				count += goods.count
			})
			return count
		},
		totlePrice(state) {
			let price = 0
			state.carPanelData.forEach((goods) => {
				price += goods.price * goods.count
			})
			return price
		},
		allChecked(state) {
			let allChecked = true
			state.carPanelData.forEach((goods) => {
				if (!goods.checked) {
					allChecked = false
					return
				}
			})
			return allChecked
		},
		checkedCount(state) {
			let count = 0
			state.carPanelData.forEach((goods) => {
				if (goods.checked)
					count += goods.count;
			})
			return count
		},
		checkedPrice(state) {
			let total = 0
			state.carPanelData.forEach((goods) => {
				if (goods.checked)
					total += goods.price * goods.count
			})
			return total
		},
		checkedGoods(state) {
			let checkedGoods = []
			state.carPanelData.forEach((goods) => {
				if (goods.checked)
					checkedGoods.push(goods);
			})
			return checkedGoods
		}
	},
	mutations: { //改变Vuex的store中的状态的唯一是提交mutations,当需要在对象上添加新属性时，使用vue.set,对象不能是vue实例。或者是vue实例的根数据对象
		addCarPanelData(state, data) { //事件名的字符串(type:'xxxx')，第二个是实际传参
			let bOff = true
			if (!state.ball.show) {
				state.carPanelData.forEach((goods) => {
					if (goods.sku_id === data.info.sku_id) { //循环看数组有无已有相同的商品
						goods.count += data.count
						bOff = false
						if (goods.count > goods.limit_num) {
							goods.count -= data.count
							state.maxOff = true
							return
						}
						state.carShow = true
						state.ball.show = true
						state.ball.img = data.info.ali_image
						state.ball.el = event.path[0] //鼠标事件
					}
				})
				if (bOff) { //加新商品进购物车
					let goodsData = data.info
					Vue.set(goodsData, 'count', data.count) //全局定义一个goodsData.count，值等于data.count
					Vue.set(goodsData, 'checked', true)
					state.carPanelData.push(goodsData)
					state.carShow = true
					state.ball.show = true
					state.ball.img = data.info.ali_image
					state.ball.el = event.path[0] //鼠标事件
				}
			}
		},
		userStatus(state, user) {
			// 更改用户信息
			if (user) {
				state.currentUser = user
				state.isLogin = true
			} else {
				state.currentUser = null
				state.isLogin = false
			}
		},
		delCarPanelData(state, id) {
			state.carPanelData.forEach((goods, index) => {
				if (goods.sku_id === id) {
					state.carPanelData.splice(index, 1)
					return
				}
			})
		},
		checkGoods(state, id) {
			state.carPanelData.forEach((goods, index) => {
				if (goods.sku_id === id) {
					goods.checked = !goods.checked
				}
			})
		},
		allGoodsCheckHandle(state, allChecked) {
			state.carPanelData.forEach((goods, index) => {
				goods.checked = !allChecked
				return
			})
		},
		delCheckGoods(state) {
			let i = state.carPanelData.length //从后往前删除
			while (i--) {
				if (state.carPanelData[i].checked) {
					state.carPanelData.splice(i, 1)
				}
			}
		},
		plusCarPanelData(state, id) {
			state.carPanelData.forEach((goods, index) => {
				if (goods.sku_id === id) {
					if (goods.count >= goods.limit_num)
						return
					goods.count++
					return
				}
			})
		},
		subCarPanelData(state, id) {
			state.carPanelData.forEach((goods, index) => {
				if (goods.sku_id === id) {
					if (goods.count <= 1)
						return
					goods.count--
					return
				}
			})
		},
		closePrompt(state) {
			state.maxOff = false
		},
		showCar(state) {
			clearTimeout(state.carTimer)
			state.carShow = true
		},
		hideCar(state) {
			//来个定时器不让它马上隐藏
			state.carTimer = setTimeout(() => {
				state.carShow = false
			}, 300)
		},
		submitReceiveHandle2(state, data) {
			state.receiveInfo.push(data)
		},
		submitReceiveHandle(state, data) {
			if (data.default) { //判断是否勾选了默认
				axios.post('/api/user/addressDefault', {
						'id': state.currentUser,
						'f': false,
						't': true,
					})
					.then(res => {})
					.catch(error => {
						console.log(error)
					})
				state.receiveInfo.forEach((receive) => {
					receive.default = false
				})
			}
			if (state.editCheck) { //修改
				axios.post('/api/user/addressModify', {
						'name': data.name,
						'phone': data.phone,
						'areaCode': data.areaCode,
						'landLine': data.landLine,
						'provinceId': data.provinceId,
						'province': data.province,
						'cityId': data.cityId,
						'city': data.city,
						'countyId': data.countyId,
						'county': data.county,
						'add': data.add,
						'df': data.default,
						'checked': data.checked,
						//旧数据
						'id': state.currentUser,
						'oldName': state.receiveInfo[state.editIndex].name,
						'oldPhone': state.receiveInfo[state.editIndex].phone,
						'oldAreaCode': state.receiveInfo[state.editIndex].areaCode,
						'oldLandLine': state.receiveInfo[state.editIndex].landLine,
						'oldCounty': state.receiveInfo[state.editIndex].county,
						'oldAdd': state.receiveInfo[state.editIndex].add,
						'oldDf': state.receiveInfo[state.editIndex].default,
						'oldChecked': state.receiveInfo[state.editIndex].checked
					})
					.then(res => {})
					.catch(error => {
						console.log(error)
					})
				state.receiveInfo.splice(state.editIndex, 1, data)
				state.editCheck = false
			} else {
				state.receiveInfo.push(data)
				//加入数据库
				axios.post('/api/user/addressAdd', {
						'id': state.currentUser,
						'name': data.name,
						'phone': data.phone,
						'areaCode': data.areaCode,
						'landLine': data.landLine,
						'provinceId': data.provinceId,
						'province': data.province,
						'cityId': data.cityId,
						'city': data.city,
						'countyId': data.countyId,
						'county': data.county,
						'add': data.add,
						'df': data.default,
						'checked': data.checked
					})
					.then(res => {})
					.catch(error => {
						console.log(error)
					})
			}
		},
		submitOrder2(state, data){
			state.orderData.unshift(data)
		},
		submitOrder(state, data) {
			//加入订单
			axios.post('/api/user/orderAdd', {
					'id': state.currentUser,
					'name': data.receiveInfo.name,
					'phone': data.receiveInfo.phone,
					'areaCode': data.receiveInfo.areaCode,
					'landLine': data.receiveInfo.landLine,
					'provinceId': data.receiveInfo.provinceId,
					'province': data.receiveInfo.province,
					'cityId': data.receiveInfo.cityId,
					'city': data.receiveInfo.city,
					'countyId': data.receiveInfo.countyId,
					'county': data.receiveInfo.county,
					'add': data.receiveInfo.add,
					'df': data.receiveInfo.default,
					'checked': data.receiveInfo.checked,
					//以上为receiveInfo部分
					'freight': data.freight,
					'iDate': data.iDate,
					'invoiceName': data.invoiceName,
					'isPay': data.isPay,
					'orderId': data.orderId,
					'price': data.price
				})
				.then(res => {})
				.catch(error => {
					console.log(error)
				})
			//货物循环提交
			data.goodsData.forEach((good) => {
				axios.post('/api/user/goodAdd', {
						'id': state.currentUser,
						'orderId': data.orderId,
						'ali_image': good.ali_image,
						'checked': good.checked,
						'count': good.count,
						'limit_num': good.limit_num,
						'price': good.price,
						'sku_id': good.sku_id,
						'spec_json_image': good.spec_json.image,
						'spec_json_show_name': good.spec_json.show_name,
						'sub_title': good.sub_title,
						'title': good.title
					})
					.then(res => {})
					.catch(error => {
						console.log(error)
					})
			})
			state.orderData.unshift(data) //把值插到数组的第一位
			let i = state.carPanelData.length
			while (i--) {
				if (state.carPanelData[i].checked) {
					state.carPanelData.splice(i, 1)
				}
			}
		},
		payNow(state, id) {
			state.orderData.forEach((order) => {
				if (order.orderId === id) {
					order.isPay = true
					axios.post('/api/user/orderisPay', {
							't': true,
							'user_id': state.currentUser,
							'order_id': id
						})
						.then(res => {})
						.catch(error => {
							console.log(error)
						})
				}
			})
		},
		checkDefault(state, data) {
			//
			axios.post('/api/user/addressDefault', {
					'id': state.currentUser,
					'f': false,
					't': true,
				})
				.then(res => {})
				.catch(error => {
					console.log(error)
				})
			//
			axios.post('/api/user/addressModifyDf', {
					't': true,
					'id': state.currentUser,
					'name': data.name,
					'phone': data.phone,
					'areaCode': data.areaCode,
					'landLine': data.landLine,
					'county': data.county,
					'add': data.add,
					'df': data.default
				})
				.then(res => {})
				.catch(error => {
					console.log(error)
				})
			state.receiveInfo.forEach((receive, index) => {
				if (receive == data) {
					receive.default = true
					//        state.receiveInfo.unshift(state.receiveInfo.splice(index,1)[0])
				} else {
					receive.default = false
				}
			})
		}
	},
	actions: { // 应用 mutations
		setUser({
			commit
		}, user) {
			commit('userStatus', user)
		}
	}
})

export default store
