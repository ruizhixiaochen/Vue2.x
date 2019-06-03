<template>
	<div id="lg">
		<div class="module-dialog-layer" style="display: block;"></div>
		<div class="module-dialog clear module-dialog-login module-dialog-show">
			<div class="dialog-panel dialog-login" v-show="rgshift">
				<div class="topbar">
					<div class="dialog-tit clear">
						<h4><B>登陆</B></h4>
					</div>
					<span class="dialog-close" @click="closeLogin()">x</span>
				</div>
				<div class="dialog-con js-dialog-container">
					<div class="animate-layer">
						<div class="dialog-inner js-login-add">
							<div class="save-login-box">
								<div class="login-form">
									<div class="module-form-row">
										<div class="form-item-v3">
											<input type="name" class="js-verify" placeholder="手机号" v-model="user.name">
											<div class="verify-error"></div>
										</div>
									</div>
									<div class="module-form-row">
										<div class="form-item-v3">
											<input type="password" class="js-verify" placeholder="密码" v-model="user.password">
											<div class="verify-error"></div>
										</div>
									</div>
									<div class="module-form-row js-dialog-title">
										<a @click="rgShift()"><U>未有账号请注册</U></a>
									</div>
									<div class="dialog-blue-btn big-main-btn js-verify-login" @click="onLogin()">
										<a>确认</a>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<!-- 注册 -->
			<div class="dialog-panel dialog-register" v-show="!rgshift">
				<div class="topbar">
					<div class="dialog-tit clear">
						<h4><B>注册</B></h4>
					</div>
					<span class="dialog-close" @click="closeLogin()">x</span>
				</div>
				<div class="dialog-con js-dialog-container">
					<div class="animate-layer">
						<div class="dialog-inner js-login-add">
							<div class="save-login-box">
								<form>
									<div class="login-form">
										<div class="module-form-row">
											<div class="form-item-v4" :class="{'form-invalid-item' :phoneError}">
												<input type="text" class="js-verify" placeholder="手机号" v-model="userSign.name" @blur="inspectPhone" @focus="setPhoneError">
											</div>
										</div>
										<div class="module-form-row">
											<div class="form-item-v3">
												<input type="password" class="js-verify" placeholder="输入密码" v-model="userSign.password">
												<div class="verify-error"></div>
											</div>
										</div>
										<div class="module-form-row">
											<div class="form-item-v3" :class="{'form-invalid-item' :comfirmError}">
												<input type="password" class="js-verify" placeholder="再次输入密码" @blur="inspectComfirm" @focus="setComfirmError"
												 v-model="userSign.confirmPassword">

											</div>
										</div>
										<div class="module-form-row js-dialog-title">
											<a @click="rgShift()"><U>已有账号请登陆</U></a>
										</div>
										<div class="dialog-blue-btn big-main-btn js-verify-login" :class="{'disabled-btn':!isRight}" @click="onRegister()">
											<a>注册</a>
										</div>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

	</div>
</template>

<script>
	export default {
		data() {
			return {
				rgshift: true,
				phoneError: false,
				comfirmError: false,
				isRight: false,
				user: {
					name: '',
					password: ''
				},
				userSign: {
					name: '',
					password: '',
					confirmPassword: ''
				}
			}
		},
		watch: {
			userSign: { //深度监听
				handler() {
					this.inspectReceive()
				},
				deep: true,
			}
		},
		//dispatch：含有异步操作，例如向后台提交数据，写法： this.$store.dispatch('mutations方法名',值)
		// commit：同步操作，写法：this.$store.commit('mutations方法名',值)
		methods: {
			closeLogin() { //触发当前实例上的事件。附加参数都会传给监听器回调。 
				this.$emit('close') //子组件向父传参,子组件点击触发事件closePop，会同时触发写在父组件的@close，还可以传参
			},
			onLogin() {
				this.$axios.post('/api/user/userLogin', {
						'name': this.user.name,
						'password': this.user.password
					})
					.then(res => {
						if (res.data.length > 0) {
							this.$emit('close')
							this.$toast('登陆成功')
							this.$store.dispatch('setUser', this.user.name)
							//加入收货地址
							this.$axios.post('/api/user/addressSearch', {
										'id': res.data[0].user_id
									})
									.then(res => {
										res.data.forEach((addrees) => {
										var receive = {
											'name': addrees.ad_name,
											'phone': addrees.ad_phone,
											'areaCode': addrees.ad_areacode,
											'landLine': addrees.ad_landline,
											'provinceId': addrees.ad_provinceid,
											'province': addrees.ad_province,
											'cityId': addrees.ad_cityid,
											'city': addrees.ad_city,
											'countyId': addrees.ad_countyid,
											'county': addrees.ad_county,
											'add': addrees.ad_add,
											'default': !!addrees.ad_default.data[0],
											'checked': !!addrees.ad_checked.data[0]
										}
										this.$store.commit('submitReceiveHandle2',receive)
										})
									})
									.catch(error => {
										this.$toast('获取收货地址失败')
									})
							//加入订单
							this.$axios.post('/api/user/orderSearch', {
										'id': res.data[0].user_id
									})
									.then(res => {
										res.data.forEach((order) => {
										var receiveInfo = {
											'name': order.ad_name,
											'phone': order.ad_phone,
											'areaCode': order.ad_areacode,
											'landLine': order.ad_landline,
											'provinceId': order.ad_provinceid,
											'province': order.ad_province,
											'cityId': order.ad_cityid,
											'city': order.ad_city,
											'countyId': order.ad_countyid,
											'county': order.ad_county,
											'add': order.ad_add,
											'default': !!order.ad_default.data[0],
											'checked': !!order.ad_checked.data[0]
										}
										let data = { //所有信息
											orderId: order.orderid,
											goodsData: [],
											price: order.price,
											freight: order.freight,
											invoiceName: order.invoicename,
											receiveInfo: receiveInfo,
											iDate: order.idate,
											isPay: !!order.ispay.data[0]
										}
										//获取该订单下的货物
										this.$axios.post('/api/user/goodSearch', {
													'id': res.data[0].user_id,
													'orderId': order.orderid
												})
												.then(res => {
													res.data.forEach((good) => {
													let goodsdata = { 
														ali_image: good.ali_image,
														checked: !!good.checked.data[0],
														count: good.count,
														limit_num: good.price,
														price: good.price,
														sku_id: good.sub_title,
														spec_json: {
															image: good.spec_json_image,
															show_name: good.spec_json_show_name
														},
														sub_title: good.sub_title,
														title: good.title
													}
													data.goodsData.push(goodsdata)
													})
												})
												.catch(error => {
													this.$toast('获取该用户订单下的货物失败')
												})
										//最后传递给store
										this.$store.commit('submitOrder2', data)
										})
									})
									.catch(error => {
										this.$toast('获取订单失败')
									})
							
						} else {
							this.$toast('账号或密码错误')
							this.user.name = ''
							this.user.password = ''
						}

					})
					.catch(error => {
						this.$toast('账号或密码错误')
						this.$store.dispatch('setUser', null)
						this.user.name = ''
						this.user.password = ''
						console.log(error)
					})
					
			},
			onRegister() { //注册
				this.$axios.post('/api/user/userAdd',{
					'name': this.userSign.name,
					'password': this.userSign.password
				})
					.then(res => {
						this.$toast(res.data)
						if(res.data == '注册成功'){
							this.userSign.name = ''
							this.userSign.password = ''
							this.userSign.confirmPassword = ''
							this.rgshift = !this.rgshift
							
						}
						if(res.data == '用户已存在' || res.data == '注册失败'){
							this.userSign.name = ''
							this.userSign.password = ''
							this.userSign.confirmPassword = ''
						}
					})
					.catch(error => {
						console.log(error)
					})
			},
			inspectReceive() {
				if (this.userSign.name && this.userSign.name.length == 11 && this.userSign.password == this.userSign.confirmPassword &&
					this.userSign.password && /^[0-9]+$/.test(this.userSign.name)) {
					this.isRight = true
				} else {
					this.isRight = false
				}
			},
			hideLogin() {
				this.$store.commit('hideLogin')
			},
			rgShift() {
				this.rgshift = !this.rgshift
			},
			inspectPhone() {
				if (this.userSign.name.length === 11 && /^[0-9]+$/.test(this.userSign.name)) {
					this.phoneError = false
				} else {
					this.phoneError = true
				}
			},
			setPhoneError() {
				this.phoneError = false
			},
			inspectComfirm() {
				if (this.userSign.password === this.userSign.confirmPassword) {
					this.comfirmError = false
				} else {
					this.comfirmError = true
				}
			},
			setComfirmError() {
				this.comfirmError = false
			}
		}
	}
</script>

<style>
	#lg .module-dialog-layer {
		display: none;
		position: fixed;
		_position: absolute;
		left: 0;
		top: 0;
		z-index: 1000;
		width: 100%;
		height: 100%;
		background-color: #000;
		opacity: .6;
	}

	#lg .module-dialog .dialog-panel,
	.module-dialog:after {
		display: inline-block;
		vertical-align: middle;
	}

	#lg .module-dialog:after {
		content: '';
		height: 100%;
		margin-left: -.25em;
	}

	#lg .module-dialog {
		position: fixed;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		z-index: 1001;
		text-align: center;
		opacity: 0;
		transition: opacity .2s ease-in;
	}

	#lg .module-dialog-show {
		opacity: 1;
	}

	#lg .module-dialog .dialog-panel {
		position: relative;
		width: 450px;
		min-width: 200px;
		border-radius: 10px;
		background: #FFF;
		box-shadow: 0 0 0 1px rgba(0, 0, 0, .1) inset, 1px 0 3px rgba(0, 0, 0, .1);
		text-align: left;
	}

	#lg .dialog-login {
		height: 320px;
	}

	#lg .dialog-register {
		height: 380px;
	}

	#lg .module-dialog .topbar {
		overflow: hidden;
		width: 100%;
		height: 60px;
		background: linear-gradient(#FFF, #F5F5F5);
		border-bottom: 1px solid #6383C6;
		border-radius: 10px 10px 0 0;
		box-shadow: 2px 0 5px rgba(0, 0, 0, .1);
	}

	#lg .module-dialog-login .topbar {
		position: relative;
		z-index: 10;
	}

	#lg .module-dialog .dialog-tit {
		height: 60px;
		text-align: center;
		padding: 0 15px;
		line-height: 60px;
	}

	#lg .module-dialog .dialog-tit h4 {
		text-align: center;
		font-size: 18px;
		font-weight: 400;
		color: #666;
	}

	#lg .module-dialog .dialog-close {
		overflow: hidden;
		display: block;
		position: absolute;
		right: 10px;
		top: 15px;
		z-index: 20;
		width: 30px;
		height: 30px;
		line-height: 30px;
		font-size: 30px;
		color: #000;
		opacity: .2;
		cursor: pointer;
		transition: all .3s linear;
	}

	#lg .module-dialog .dialog-close:hover {
		opacity: .3;
	}

	.module-dialog .animate-layer {
		position: relative;
	}

	#lg .module-dialog-login .save-login-box {
		width: 450px;
		padding-top: 29px;
	}

	#lg .login-form {
		width: 370px;
		margin: 0 auto;
	}

	.account-login .login-form {
		padding: 30px;
		margin: 0;
	}

	#lg .module-form-row {
		position: relative;
		padding-bottom: 10px;
		margin: 0 auto;
	}

	#lg .login-form .module-form-row {
		padding-bottom: 15px;
	}

	#lg .module-form-row .form-item-v3 {
		position: relative;
		height: 46px;
		background: #FFF;
		border: 1px solid #CCC;
		border-radius: 6px;
		box-shadow: 0 3px 5px -4px rgba(0, 0, 0, .4) inset, -1px 0 3px -2px rgba(0, 0, 0, .1) inset;
		line-height: 46px;
		font-size: 18px;
		opacity: .618;
		transition: opacity .3s ease;
	}

	#lg .module-form-row .form-item-v4 {
		position: relative;
		height: 46px;
		background: #FFF;
		border: 1px solid #CCC;
		border-radius: 6px;
		box-shadow: 0 3px 5px -4px rgba(0, 0, 0, .4) inset, -1px 0 3px -2px rgba(0, 0, 0, .1) inset;
		line-height: 46px;
		font-size: 18px;
		opacity: .618;
		transition: opacity .3s ease;
	}

	#lg .module-form-row .form-item-v3 i {
		position: absolute;
		left: 15px;
		top: 0;
		font-size: 16px;
		color: #BEBEBE;
	}

	#lg .module-form-row .form-item-v4 i {
		position: absolute;
		left: 15px;
		top: 0;
		font-size: 16px;
		color: #BEBEBE;
	}

	#lg .module-form-row .form-item-v3 input {
		padding: 0 15px;
		background-color: transparent;
		border: none;
		font-size: 16px;
	}

	#lg .module-form-row .form-item-v4 input {
		padding: 0 15px;
		background-color: transparent;
		border: none;
		font-size: 16px;
	}

	#lg .login-form .form-item-v3 input {
		width: 330px;
	}

	#lg .login-form .form-item-v4 input {
		width: 330px;
	}

	#lg .login-form .form-item-v3:after {
		/* 选择<div>元素内的所有<p>元素  在每个<p>元素之后插入内容 */
		position: absolute;
		right: 13px;
		top: 50%;
		z-index: 11;
		height: 26px;
		padding: 0 10px;
		margin-top: -13px;
		background: #D16D62;
		border-radius: 4px;
		line-height: 26px;
		font-size: 12px;
		color: #FFF;
		visibility: hidden;
		content: "两次输入不一致";
		opacity: 0;
		transition: all .3s ease-in;
	}

	#lg .login-form .form-item-v4:after {
		/* 选择<div>元素内的所有<p>元素  在每个<p>元素之后插入内容 */
		position: absolute;
		right: 13px;
		top: 50%;
		z-index: 11;
		height: 26px;
		padding: 0 10px;
		margin-top: -13px;
		background: #D16D62;
		border-radius: 4px;
		line-height: 26px;
		font-size: 12px;
		color: #FFF;
		visibility: hidden;
		content: "手机号码格式错误";
		opacity: 0;
		transition: all .3s ease-in;
	}

	#lg .module-form-row .form-invalid-item {
		opacity: 1;
		border: 1px solid #D16D62;
	}

	#lg .module-form-row .form-invalid-item:after {
		visibility: visible;
		opacity: 1;
	}

	#lg .login-form .area-code-w {
		width: 118px;
	}

	#lg .login-form .telephone-w {
		width: 238px;
	}

	#lg .module-form-row div.select-item {
		width: auto;
		height: auto;
		margin: 0;
		background: 0 0;
		border: none;
		box-shadow: none;
		opacity: 1;
	}

	#lg .module-form-row .form-item-v3 select {
		margin: 0 0 0 15px;
		background-color: transparent;
		border: none;
		font-size: 16px;
		color: #333;
	}

	#lg .module-form-row .form-item-v4 select {
		margin: 0 0 0 15px;
		background-color: transparent;
		border: none;
		font-size: 16px;
		color: #333;
	}

	#lg .login-form .select-province {
		width: 370px;
	}

	#lg .form-focus-item {
		z-index: 1;
		opacity: 1;
		border: 1px solid #6B93F2;
	}

	#lg .module-form-row div.select-item {
		width: auto;
		height: auto;
		margin: 0;
		background: 0 0;
		border: none;
		box-shadow: none;
		opacity: 1;
	}

	#lg .module-form-row .form-item-v3 select {
		height: 48px;
		padding: 0 15px;
		margin: 0;
		background: -webkit-linear-gradient(top, #FAFAFA, #F5F5F5);
		background: linear-gradient(#FAFAFA, #F5F5F5);
		border: 1px solid #CCC;
		border-radius: 6px;
		box-shadow: 2px 0 0 rgba(255, 255, 255, .4) inset, 1px 0 0 rgba(255, 255, 255, .3);
		line-height: 48px;
		text-indent: 0;
		outline: 0;
		-webkit-appearance: none;
		-moz-appearance: none;
		cursor: pointer;
	}

	#lg .module-form-row .form-item-v4 select {
		height: 48px;
		padding: 0 15px;
		margin: 0;
		background: -webkit-linear-gradient(top, #FAFAFA, #F5F5F5);
		background: linear-gradient(#FAFAFA, #F5F5F5);
		border: 1px solid #CCC;
		border-radius: 6px;
		box-shadow: 2px 0 0 rgba(255, 255, 255, .4) inset, 1px 0 0 rgba(255, 255, 255, .3);
		line-height: 48px;
		text-indent: 0;
		outline: 0;
		-webkit-appearance: none;
		-moz-appearance: none;
		cursor: pointer;
	}

	#lg .login-form .select-city,
	#lg .login-form .select-district {
		width: 180px;
	}

	#lg .login-form .blue-checkbox {
		top: 0;
		float: right;
		margin-right: 5px;
	}

	#lg .blue-checkbox-on,
	.choose-checkbox-on .blue-checkbox {
		background: url(../assets/img/checkbox-bg.png) 0 -20px no-repeat;
	}

	#lg .dialog-blue-btn {
		padding: 1px;
		background: #6383C6;
		background: linear-gradient(#6383C6, #4262AF);
		border-radius: 6px;
		text-align: center;
		color: #FFF;
	}

	#lg .disabled-btn {
		opacity: .4;
	}

	#lg .disabled-btn,
	.disabled-btn a {
		cursor: not-allowed;
		-webkit-transition: none;
		transition: none;
		pointer-events: none;
	}

	#lg .dialog-blue-btn a {
		display: block;
		padding: 2px 0;
		background: #5F7ED7;
		background: linear-gradient(#6F97E5, #527ED9);
		border-radius: 5px;
		box-shadow: inset 0 1px 2px #7EA1E8;
		text-shadow: 0 -1px 0 #4F70B3;
		color: #FFF;
	}

	#lg .big-main-btn a {
		height: 42px;
		line-height: 42px;
		font-size: 18px;
	}

	#lg .js-dialog-title {
		text-align: right;
	}

	/* 注册 */
</style>
