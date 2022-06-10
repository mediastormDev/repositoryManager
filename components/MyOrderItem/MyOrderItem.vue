<template>
	<view class="my_order_view">
		<view class="order_date">工单 2020-12-3 23:23</view>
		<view class="gear_infos">
			<view style="margin-top: 10px;">
				<GearInfoView imageSize="small" :gear="gearItem" />
			</view>
			<view style="margin-top: 10px;">
				<GearInfoView imageSize="small" :gear="gearItem" />
			</view>
			<view style="margin-top: 10px;">
				<GearInfoView imageSize="small" :gear="gearItem" />
			</view>
		</view>
		<view class="order_footer">
			<view class="footer_title">请在2月5日 12:20之后取走设备</view>
			<button class="modify_btn">修改</button>
			<button class="return_btn">归还</button>
			<button class="modify_btn">再来一单</button>
		</view>
	</view>
</template>

<script setup lang="ts">
	import {
		ref
	} from 'vue';
	import {
		GearStatus
	} from '@/composables/UseGear.ts';
	import GearInfoView from '../GearInfoView/GearInfoView.vue';

	const gearItem = ref({
		name: '科莫多11',
		_id: 1,
		image: 'http://via.placeholder.com/640x360',
		status: GearStatus.free,
		selected: false,
	})
</script>

<style lang="less">
	.my_order_view {
		padding: 10px 10px 20px 10px;
		background-color: white;
		margin-top: 10px;

		.order_date {
			font-size: 14px;
			font-weight: 400;
			color: #24252C;
		}

		.gear_infos {}

		.order_footer {
			display: flex;
			align-items: center;
			justify-content: space-between;

			.footer_title {
				font-size: 14px;
				font-weight: 400;
				color: #24252C;
			}
		}

		.modify_btn {
			border-radius: 10px;
			border: 1px solid #D8D8D8;
			font-size: 14px;
			font-weight: 600;
			color: #24252C;
			background-color: white;
		}
		
		.return_btn {
			border-radius: 10px;
			border: none;
			font-size: 14px;
			font-weight: 600;
			color: #A2662A;
			background-color: #FFDA71;
		}
	}
</style>
