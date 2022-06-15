<template>
	<view class="my_return_item">
		<view class="top_view">
			<GearInfoView :gear="returnItem.asset" imageSize="mini" />
			<view><button size="mini" class="return_btn" @click="onClickReturn">归还</button></view>
		</view>
		<view>
			<OrderItem v-for="borrow in returnItem.borrows" :info="borrow" bgColor="white" />
		</view>
	</view>
</template>

<script setup lang="ts">
	import GearInfoView from '../GearInfoView/GearInfoView.vue';
	import OrderItem from '../OrderItem/OrderItem.vue';

	const props = defineProps < {
		returnItem: any
	} > ()

	const onClickReturn = () => {
		console.log('提醒归还')
		uni.showToast({
			title: '请联系管理员归还'
		})
	}
</script>

<style lang="less">
	.my_return_item {
		background-color: white;
		padding: 10px;

		.top_view {
			display: flex;
			align-items: center;
			justify-content: space-between;
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
