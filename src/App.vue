<!-- 1模板。html结构，有且只有一个根标签如只能有一个div，不能有p或者别的div -->
<template>
	<div id="app">
		<header-nav></header-nav>
		<router-view />
	</div>
</template>

<!-- 2行为。处理逻辑 -->
<script>
	import headerNav from '@/components/header-nav'
	export default {
		name: 'App',
		components: {
			headerNav
		},
		mounted: function() {
			this.$router.push('/');
		}
	}
</script>

<!-- 3样式 -->
<style>

</style>
