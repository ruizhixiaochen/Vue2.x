<template>
	<div class="wrap" v-if="showWrap" :class="showContent ?'fadein':'fadeout'"><div class="wrap-text">{{text}}</div></div>
</template>

<style scoped>
	.wrap {
		z-index:1000;
		position: fixed;
		left: 50%;
		top: 85%;
		background: rgba(0, 0, 0, .35);
		padding: 20px;
		padding-left: 200px;
		padding-right: 200px;
		border-radius: 10px;
		transform: translate(-50%, -50%);
		color: #fff;
	}

	.wrap-text {
		width: 100%;
		height: 100%;
		text-align: center;
	}

	.fadein {
		animation: animate_in 0.10s;
	}

	.fadeout {
		animation: animate_out 0.10s;
		opacity: 0;
	}

	@keyframes animate_in {
		0% {
			opacity: 0;
		}

		100% {
			opacity: 1;
		}
	}

	@keyframes animate_out {
		0% {
			opacity: 1;
		}

		100% {
			opacity: 0;
		}
	}
</style>
