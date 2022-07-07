<template>
	<view class="my_return_item">
		<OrderItem :info="borrowItems[0]" bgColor="white" />
		<view class="top_view" v-for="borrow in borrowItems" :key="borrow._id">
			<GearInfoView :gear="borrow.asset" imageSize="mini" />
			<view v-if="borrow.asset.status !== 'INUSE'" style="text-align: right;"><button size="mini" class="return_btn" @click="onClickBorrow(borrow._id)">借出</button>
			</view>
		</view>
	</view>
</template>

<script setup lang="ts">
	import {
		inject,
		onMounted
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
		borrowItems: any[],
		loadData: Function
	} > ()

	const onClickBorrow = debounce((ticketid) => {
		uni.showLoading({
			title: '请稍候..'
		})
		lendGear(ticketid).then(res => {
			uni.hideLoading()
			uni.showToast({
				title: "已借出"
			})
			props.loadData();
		})
	}, 100)

	onMounted(() => {
		console.log("admin item mounted", props.borrowItems);
	})
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
			background: #8D87B6;
			border-radius: 10px;
			color: #FFFFFF;
			border: none;
			padding: 6px 16px;
		}
	}
</style>
