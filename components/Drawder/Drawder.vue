<template>
	<view class="drawer_bg" v-if="show" @click="closeDrawer">
		<view v-if="drawShow" class="drawer_body" @click.stop="">
			<slot></slot>
		</view>
	</view>
</template>

<script setup lang="ts">
	import {
		ref
	} from 'vue';

	const show = ref(false);
	const drawShow = ref(false);

	const openDrawer = () => {
		show.value = true;
		setTimeout(() => {
			drawShow.value = true;
		}, 100)
	}

	const closeDrawer = () => {
		drawShow.value = false;

		setTimeout(() => {
			show.value = false;
		}, 100)
	}

	defineExpose({
		openDrawer,
		closeDrawer
	})
</script>

<style lang="less">
	.drawer_bg {
		position: fixed;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		background: rgba(0, 0, 0, 0.1);
		animation-name: opacityAn;
		animation-duration: .1s;

		.drawer_body {
			background-color: white;
			padding: 10px;
			border-radius: 10px 10px 0px 0px;
			position: absolute;
			bottom: 0;
			left: 0;
			right: 0;
			min-height: 350px;
			transform: translateY(20%);
			animation-name: translateYAn;
			animation-duration: .1s;
		}

		@keyframes translateYAn {
			0% {
				bottom: -100%;
			}

			100% {
				bottom: 0px;
			}
		}
		
		@keyframes opacityAn {
			0% {
				opacity: 0;
			}
		
			100% {
				opacity: 1;
			}
		}
		
		
	}
</style>
