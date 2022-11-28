<template>
	<view class="tabs_view">
		<view v-if="!isAdmin" @click="clickTabs(0)" class="tab" :class="{selected: tabsIndex === 0}">我的工单</view>
		<view v-if="!isAdmin" @click="clickTabs(1)" class="tab" :class="{selected: tabsIndex === 1}">归还设备</view>
		<view v-if="isAdmin" @click="clickTabs(2)" class="tab" :class="{selected: tabsIndex === 2}">出借申请</view>
		<view v-if="isAdmin" @click="clickTabs(3)" class="tab" :class="{selected: tabsIndex === 3}">归还设备</view>
		<view v-if="isAdmin" @click="clickTabs(4)" class="tab" :class="{selected: tabsIndex === 4}">历史记录</view>
	</view>
	<view>
		<MyOrdersView ref="orderViewRef" v-show="tabsIndex === 0" />
		<MyReturnsView ref="myreturnsRef" v-show="tabsIndex === 1" />
		<AdminBorrowView ref="adminBorrowRef" v-show="tabsIndex === 2 " />
		<AdminReturnsView ref="adminReturnsRef" v-show="tabsIndex === 3" />
		<AdminHistory ref="adminReturnsRef" v-show="tabsIndex === 4" />
	</view>
</template>

<script setup lang="ts">
	import {
		ref
	} from 'vue';
	import MyOrdersView from '@/components/MyOrders/MyOrders.vue';
	import MyReturnsView from '@/components/MyReturns/MyReturns.vue';
	import AdminReturnsView from '@/components/AdminReturn/AdminReturn.vue'
	import AdminBorrowView from '@/components/AdminBorrow/AdminBorrow.vue';
	import AdminHistory from '@/components/AdminHistory/AdminHistory.vue';
	import {
		onPullDownRefresh,
		onShow
	} from "@dcloudio/uni-app";
	import UseToken from '@/composables/UseToken.js';

	const orderViewRef = ref(null);
	const myreturnsRef = ref(null);
	const adminBorrowRef = ref(null);
	const adminReturnsRef = ref(null);

	const {
		isAdmin
	} = UseToken();

	const tabsIndex = ref(isAdmin.value ? 2 : 0);

	const clickTabs = (index: Number) => {
		console.log('isAdmin.value123', isAdmin.value);
		tabsIndex.value = index;
	}

	onPullDownRefresh(() => {
		console.log('onPullDownRefresh')
		if (tabsIndex.value == 0) {
			orderViewRef.value && orderViewRef.value.loadData();
		} else if (tabsIndex.value == 1) {
			myreturnsRef.value && myreturnsRef.value.loadData();
		} else if (tabsIndex.value == 2) {
			adminBorrowRef.value && adminBorrowRef.value.loadData();
		} else if (tabsIndex.value == 3) {
			adminReturnsRef.value && adminReturnsRef.value.loadData();
		}


	})

	onShow(() => {
		console.log('A page onshow')
	})
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
