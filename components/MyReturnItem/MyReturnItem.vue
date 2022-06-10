<template>
	<view class="my_return_item">
		<view class="top_view">
			<GearInfoView imageSize="mini" />
			<view><button size="mini" class="return_btn">归还</button></view>
		</view>
		<view>
			<OrderItem bgColor="white" />
			<OrderItem bgColor="white" />
		</view>
	</view>
</template>

<script setup lang="ts">
	import GearInfoView from '../GearInfoView/GearInfoView.vue';
	import OrderItem from '../OrderItem/OrderItem.vue';
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
			padding: 12px 16px;
		}
	}
</style>
