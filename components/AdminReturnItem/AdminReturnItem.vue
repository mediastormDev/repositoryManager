<template>
	<!-- 	<view class="my_return_item">
		<view class="top_view">
			<GearInfoView :gear="returnItem.asset" imageSize="mini" />
			<view><button size="mini" class="return_btn" @click="onClickReturn">归还</button></view>
		</view>
		<view>
			<OrderItem v-for="borrow in returnItem.borrows" :info="borrow" bgColor="white" />
		</view>
	</view> -->
	<view class="my_return_item">
		<OrderItem :info="borrowItems[0]" bgColor="white" />
		<view class="top_view" v-for="borrow in borrowItems" :key="borrow._id">
			<GearInfoView :gear="borrow.asset" imageSize="mini" />
			<view v-if="borrow.asset.status == 'INUSE'" style="text-align: right;"><button size="mini"
					class="return_btn" @click="onClickReturn(borrow._id)">归还</button>
			</view>
		</view>
	</view>
</template>

<script setup lang="ts">
	import GearInfoView from '../GearInfoView/GearInfoView.vue';
	import OrderItem from '../OrderItem/OrderItem.vue';
	import {
		returnGear
	} from '@/common/apis/borrow.js';

	const props = defineProps < {
		borrowItems: any[],
		loadData: Function
	} > ()

	const onClickReturn = (ticketid) => {
		uni.showLoading({
			title: '请稍候..'
		})
		returnGear(ticketid).then(() => {
			uni.hideLoading()
			uni.showToast({
				title: "已归还"
			})
			props.loadData();
		});
	}
</script>

<style lang="less">
	.my_return_item {
		background-color: white;
		padding: 10px;
		margin-top: 10px;

		.top_view {
			display: flex;
			flex-direction: column;
			margin-top: 10px;
		}


		.return_btn {
			background: #FFDA71;
			border-radius: 10px;
			color: #A2662A;
			border: none;
			padding: 6px 16px;
		}
	}
</style>
