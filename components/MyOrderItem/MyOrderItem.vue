<template>
	<view class="my_order_view">
		<view class="order_date">工单{{dayjs(orderInfo.createdAt).format('MM月DD日 HH:mm')}}</view>
		<view class="gear_infos">
			<view style="margin-top: 10px;" v-for="borrow in orderInfo.borrows">
				<GearInfoView imageSize="small" :gear="borrow.asset" />
			</view>
		</view>
		<view class="order_footer">
			<view class="footer_title" v-if="orderInfo.status == STATUS.PENDING">
				请在{{dayjs(orderInfo.pendingLentAt).format('MM月DD日 HH:mm')}}之后取走设备</view>
			<view class="footer_title" v-if="orderInfo.status == STATUS.INUSE">
				请在{{dayjs(orderInfo.pendingReturnAt).format('MM月DD日 HH:mm')}}之前归还设备</view>
			<view class="footer_title" v-if="orderInfo.status == STATUS.FINISH">设备已归还</view>
			<view v-if="orderInfo.status == STATUS.OTHER">{{orderInfo.status}}</view>
			<view>
				<button @click="modifyBook" class="modify_btn" v-if="orderInfo.status == STATUS.PENDING">修改</button>
				<button @click="remindReturn" class="return_btn" v-if="orderInfo.status == STATUS.INUSE">归还</button>
				<button @click="moreBook" class="modify_btn" v-if="orderInfo.status == STATUS.FINISH">再来一单</button>
			</view>
		</view>
	</view>
</template>

<script setup lang="ts">
	import {
		ref,
		computed
	} from 'vue';
	import dayjs from 'dayjs';
	import {
		GearStatus
	} from '@/composables/UseGear.ts';
	import GearInfoView from '../GearInfoView/GearInfoView.vue';

	enum STATUS {
		PENDING = 'PENDING',
			INUSE = 'INUSE',
			FINISH = 'FINISH',
			OTHER = 'OTHER',
	}

	const props = defineProps < {
		orderInfo: any
	} > ();

	const remindReturn = () => {
		uni.showToast({
			title: '请联系管理员归还'
		})
	}

	const modifyBook = () => {
		uni.setStorage({
			data: props.orderInfo,
			key: 'orderInfo',
			success: () => {
				uni.navigateTo({
					url: '/pages/BookGears/BookGears'
				})
			}
		})
	}

	const moreBook = () => {
		uni.setStorage({
			data: props.orderInfo,
			key: 'orderInfoMore',
			success: () => {
				uni.navigateTo({
					url: '/pages/BookGears/BookGears'
				})
			}
		})
	}


	// const status = computed(() => {
	// 	const nowDate = dayjs();
	// 	console.log('nowdate', nowDate.unix())
	// 	console.log('props.orderInfo.pendingLentAt', dayjs(props.orderInfo.pendingLentAt).unix())
	// 	if (nowDate.unix() < dayjs(props.orderInfo.pendingLentAt).unix()) {
	// 		// 当前时间小于预定借用时间，修改
	// 		return STATUS.NOTYET
	// 	} else if (nowDate.unix() > dayjs(props.orderInfo.pendingLentAt).unix() && nowDate.unix() < dayjs(props
	// 			.orderInfo.pendingReturnAt).unix() && props.orderInfo.lentAt) {
	// 		// 大于借用时间，小于归还时间
	// 		return STATUS.BORROWED
	// 	} else if (props.orderInfo.lentAt && !props.orderInfo.returnAt && nowDate.unix() > dayjs(props.orderInfo
	// 			.pendingReturnAt).unix()) {
	// 		// 已超过预计归还时间
	// 		return STATUS.DELAYEDRETURN;
	// 	} else if (props.orderInfo.returnAt) {
	// 		// 已归还
	// 		return STATUS.RETURNED
	// 	} else if (nowDate.unix() > dayjs(props.orderInfo.pendingReturnAt).unix() && !props.orderInfo.lentAt) {
	// 		// 当前时间大于预计借用时间且没有实际借用时间
	// 		return STATUS.DELAYED
	// 	}
	// })


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
			margin-top: 10px;

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
			padding: 6px 16px;
		}

		.return_btn {
			border-radius: 10px;
			padding: 6px 16px;
			border: none;
			font-size: 14px;
			font-weight: 600;
			color: #A2662A;
			background-color: #FFDA71;
		}
	}
</style>
