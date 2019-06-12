<template>
	<div id="header">
		<div class="nav-global">
			<div class="container">
				<router-link class="nav-logo" tag='h1' to="/"><a href="javascript:;"></a></router-link>
				<ul class="nav-aside">
					<li class="nav-user">
						<a href="javascript:;" @click="showlogin()">个人中心</a>
						<!--active-->
						<div class="nav-user-wrapper" v-show="isLogin">
							<div class="nav-user-list">
								<dl class="nav-user-avatar">
									<dd><span class="ng-scope"></span></dd>
									<dt class="ng-binding">+86 {{currentUser}}</dt>
								</dl>
								<ul>
									<router-link class="order" tag='li' to="/account"><a href="javascript:;">我的订单</a></router-link>
									<router-link class="order" tag='li' to="/address"><a href="javascript:;">收货地址</a></router-link>
									<li class="order"><a href="javascript:;" @click="renovate()">退出</a></li>
								</ul>
							</div>
						</div>
					</li>
					<!--active-->
					<car-panel></car-panel>
					<login v-if="lShow" @close="closeLogin"></login>
				</ul>
				<ul class="nav-list">
					<router-link tag='li' to="/"><a href="javascript:;">在线商城</a></router-link>
					<li><a href="javascript:;" @click="indexTips">坚果 Pro</a></li>
					<li><a href="javascript:;" @click="indexTips">Smartisan M1 / M1L</a></li>
					<li><a href="javascript:;" @click="indexTips">Smartisan OS</a></li>
					<li><a href="javascript:;" @click="indexTips">欢喜云</a></li>
					<li><a href="javascript:;" @click="indexTips">应用下载</a></li>
					<li><a href="javascript:;" @click="indexTips">官方论坛</a></li>
				</ul>
			</div>
		</div>
		<div class="nav-sub">
			<div class="nav-sub-wrapper">
				<div class="container">
					<ul class="github-logo" @click="goGithub('github.com/dand1022/Vue2.x')"></ul>
					<ul class="nav-list">
						<router-link tag='li' to="/"><a href="javascript:;">首页</a></router-link>
						<li><a href="javascript:;" @click="indexTips">手机</a></li>
						<li><a href="javascript:;" @click="indexTips">“足迹系列”手感膜</a></li>
						<li class="active">
							<router-link to="/">官方配件</router-link>
						</li>
						<li><a href="javascript:;" @click="indexTips">周边产品</a></li>
						<li><a href="javascript:;" @click="indexTips">第三方配件</a></li>
						<li><a href="javascript:;" @click="indexTips">全部商品</a></li>
						<li><a href="javascript:;" @click="indexTips">服务</a></li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import Login from '@/components/login'
	import CarPanel from '@/components/car-panel'
	export default {
		components: {
			CarPanel,
			Login,
		},
		computed: {
			currentUser() {
				return this.$store.state.currentUser
			},
			isLogin() {
				return this.$store.getters.isLogin
			},
			lShow() {
				return this.$store.state.loginShow
			}
		},
		methods: {
			indexTips() {
				this.$toast('页面正在开发中')
			},
			closeLogin() {
				this.$store.state.loginShow = false
			},
			showlogin() {
				if (this.$store.state.currentUser === null) {
					this.$store.state.loginShow = true
				}
			},
			renovate() {
				this.$router.go(0)
			},
			goGithub(e) {
				window.location.href = 'https://' + e
			} 
		}
	}
</script>

<style>
	.github-logo {
		z-index:1000;
		position: absolute;
		right: 5%;
		top: 21%;
		background-image: url(~@/assets/github_logo_48x48.png);
		padding: 24px;
		cursor: pointer;
		transition: all .3s linear;
	}
	.github-logo:hover{
		opacity: .6;
	}
</style>
