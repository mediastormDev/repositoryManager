<template>
	<view class="tabs_view">
		<view @click="clickTabs(0)" class="tab" :class="{selected: tabsIndex === 0}">我的工单</view>
		<view @click="clickTabs(1)" class="tab" :class="{selected: tabsIndex === 1}">归还设备</view>
	</view>
	<view>
		<MyOrdersView v-show="tabsIndex === 0" />
		<MyReturnsView v-show="tabsIndex === 1" />
	</view>
</template>

<script setup lang="ts">
	import {
		ref
	} from 'vue';
	import MyOrdersView from '@/components/MyOrders/MyOrders.vue';
	import MyReturnsView from '@/components/MyReturns/MyReturns.vue';

	const tabsIndex = ref(0);

	const clickTabs = (index: Number) => {
		tabsIndex.value = index;
	}
</script>

<style lang="less">
	.tabs_view {
		display: flex;
		align-items: center;
		justify-content: space-between;
		background-color: white;

		.tab {
			font-size: 14px;
			font-weight: 600;
			color: #9e9fa2;
			display: flex;
			align-items: center;
			justify-content: center;
			flex: 1;
			padding: 16px 0 15px 0;
			position: relative;

			&.selected {
				color: #24252C;
			}
		}

		.tab.selected::after {
			content: '';
			position: absolute;
			bottom: 5px;
			left: 0;
			right: 0;
			margin: auto;
			width: 18px;
			height: 4px;
			background: #FC6294;
			border-radius: 2px;
		}
	}
</style>
