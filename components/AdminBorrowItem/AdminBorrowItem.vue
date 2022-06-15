<template>
	<view class="my_return_item">
		<view class="top_view">
			<GearInfoView :gear="borrowItem" imageSize="mini" />
			<view><button size="mini" class="return_btn" @click="onClickBorrow">借出</button></view>
		</view>
		<view>
			<OrderItem v-for="borrow in ticketInfo.borrows" :info="borrow" bgColor="white" />
		</view>
	</view>
</template>

<script setup lang="ts">
	import {
		inject
	} from 'vue';
	import GearInfoView from '../GearInfoView/GearInfoView.vue';
	import OrderItem from '../OrderItem/OrderItem.vue';
	import {
		lendGear,
	} from '@/common/apis/borrow.js';
	import {
		debounce
	} from 'lodash';

	const props = defineProps < {
		borrowItem: any,
		ticketid: String,
		ticketInfo: any,
		loadData: Function
	} > ()

	const onClickBorrow = debounce(() => {
		uni.showLoading({
			title: '请稍候..'
		})
		lendGear(props.ticketid).then(res => {
			uni.hideLoading()
			uni.showToast({
				title: "已借出"
			})
			props.loadData();
		})
	}, 100)
</script>

<style lang="less">
	.my_return_item {
		background-color: white;
		padding: 10px;
		margin-top: 10px;

		.top_view {
			display: flex;
			align-items: center;
			justify-content: space-between;
		}

		.return_btn {
			background: #8D87B6;
			border-radius: 10px;
			color: #FFFFFF;
			border: none;
			padding: 6px 16px;
		}
	}
</style>
