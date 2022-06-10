<template>
	<view class="gear_list_view">
		<view class="gear_list_item" v-for="gear in gearList" :key="gear._id">
			<GearInfoView :gear="gear" />
			<icon v-if="gearList.length !== 1" type="clear"></icon>
		</view>
	</view>
	<view style="margin-top: 20px;">
		<view class="select_view">
			<view class="title">开始时间</view>
			<view class="input_view" @click="selectStartTime">
				<view v-if="startDate">{{startDate && dayjs(startDate).format('MM月DD日 HH:mm')}}</view>
				<view v-else class="default_text">请选择</view>
				<icon type="cancel"></icon>
			</view>
		</view>
		<view class="select_view">
			<view class="title">结束时间</view>
			<view class="input_view" @click="selectEndTime">
				<view v-if="endDate">{{ endDate && dayjs(endDate).format('MM月DD日 HH:mm')}}</view>
				<view v-else class="default_text">请选择</view>
				<icon type="cancel"></icon>
			</view>
		</view>
		<view class="select_view">
			<view class="title">持续时间</view>
			<view class="input_view">
				<view v-if="startDate && endDate && !disableBtn">{{timeDiff}}</view>
				<view v-else class="default_text">选择起止时间后计算</view>
				<icon type="cancel"></icon>
			</view>
		</view>
	</view>
	<view class="booked_view" v-if="bookInfo.length">
		<view class="notice">当前时间段内以下设备不可申请，提交后<span class="strong_text">这些设备</span>将<span
				class="strong_text">不会</span>被预约</view>
		<view class="booked_list">
			<view class="booked_list_item" v-for="book in bookInfo" :key="book._id">
				<view class="title">{{book.gear.name}}</view>
				<OrderItemView :info="book" bgColor="#FFFFFF" />
			</view>
		</view>
	</view>
	<view class="book_button_view">
		<button class="book_button" :disabled="disableBtn" @click="pressBook">立即预约</button>
	</view>
	<DatePickerView @onConfirm="onDatePickerConfirm" ref="datePickerRef" />
</template>

<script lang="ts" setup>
	import {
		ref,
		computed,
		onMounted
	} from 'vue';
	import GearInfoView from '../../components/GearInfoView/GearInfoView.vue';
	import DatePickerView from '@/components/DatePickerView/DatePickerView.vue';
	import OrderItemView from '@/components/OrderItem/OrderItem.vue';
	import dayjs from 'dayjs';
	import {
		debounce
	} from 'lodash';
	import {
		previewTicket,
		createTicket
	} from '@/common/apis/ticket.js';

	const datePickerRef = ref(null);
	const startDate = ref('');
	const endDate = ref('');
	const gearList = ref([]);
	const bookInfo = ref([]);
	const disableBtn = ref(false);

	const timeDiff = computed(() => {
		return timeDifference(startDate.value, endDate.value)
	})

	let selectDateType = 0

	const timeDifference = (startTime, endTime) => { //可以传日期时间或时间戳
		let start = typeof(startTime) == "number" ? startTime : new Date(startTime).getTime(),
			end = typeof(endTime) == "number" ? endTime : new Date(endTime).getTime(),
			difference = end - start, //时间差的毫秒数
			days = Math.floor(difference / (24 * 3600 * 1000)), //计算出相差天数
			leave1 = difference % (24 * 3600 * 1000), //计算天数后剩余的毫秒数
			hours = Math.floor(leave1 / (3600 * 1000)), //计算相差分钟数
			leave2 = leave1 % (3600 * 1000), //计算小时数后剩余的毫秒数
			minutes = Math.floor(leave2 / (60 * 1000)), //计算相差秒数
			leave3 = leave2 % (60 * 1000), //计算分钟数后剩余的毫秒数
			seconds = Math.round(leave3 / 1000);
		return `${days}天${hours}小时${minutes}分`
	}

	const selectStartTime = () => {
		console.log('click show picker')
		selectDateType = 0;
		datePickerRef.value && datePickerRef.value.openPicker();
	}

	const selectEndTime = () => {
		selectDateType = 1;
		datePickerRef.value && datePickerRef.value.openPicker();
	}

	const onDatePickerConfirm = (date: String) => {
		console.log('date', date);
		if (selectDateType === 0) {
			startDate.value = date;
		} else {
			endDate.value = date;
		}

		if (startDate.value && endDate.value) {
			const start = dayjs(startDate.value);
			const end = dayjs(endDate.value);
			console.log('sdfds', start.diff(end, 'millisecond'))
			// 检查时间是否有问题
			if (start.diff(end, 'millisecond') > 0) {
				uni.showModal({
					title: '错误',
					content: '开始时间不能大于结束时间',
					showCancel: false
				})
				disableBtn.value = true;
				return
			} else if (end.diff(start, 'millisecond') < 0) {
				uni.showModal({
					title: '错误',
					content: '结束时间不能小于结束时间',
					showCancel: false
				})
				disableBtn.value = true;
				return;
			}
		}

		disableBtn.value = false;


		if (startDate.value && endDate.value) {
			previewIfBooked()
		}
	}

	const previewIfBooked = () => {
		const barcodes = gearList.value.map(item => item.barcode);
		previewTicket(barcodes, startDate.value, endDate.value).then(res => {
			const temp = res.map(booked => {
				gearList.value.map(gear => {
					if (gear.barcode == booked.barcode) {
						booked.gear = gear;
						gear.booked = true;
					}
				})
				return booked
			})
			bookInfo.value = temp;
			return bookInfo;
		})
	}

	const pressBook = debounce(() => {
		const barcodes = gearList.value.filter(item => !item.booked).map(item => item.barcode);
		if (barcodes.length) {
			createTicket(barcodes, startDate.value, endDate.value).then(res => {
				console.log('createTicket', res);
			})
		} else {
			uni.showToast({
				title: '时段有冲突',
				icon: 'error'
			})
		}

	}, 100)

	onMounted(() => {
		uni.getStorage({
			key: 'selectedGears',
			success: (res) => {
				gearList.value = res.data;
				console.log('selectedGears', gearList.value)
			}
		})

	})
</script>

<style lang="less">
	.gear_list_view {
		background-color: white;
		padding: 10px 15px 10px 10px;

		.gear_list_item {
			display: flex;
			align-items: center;
			justify-content: space-between;
		}

		.gear_list_item+.gear_list_item {
			margin-top: 20px;
		}
	}

	.default_text {
		font-size: 14px;
		font-weight: 600;
		color: #D8D8D8;
	}

	.select_view {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 20px;
		font-size: 14px;
		font-weight: 600;
		color: #24252C;
		background-color: white;

		.title {}

		.input_view {
			display: flex;
			align-items: center;
		}
	}

	.booked_view {
		padding: 10px;

		.notice {
			font-size: 11px;
			font-weight: 600;
			color: #646464;
			margin: 10px 10px 15px 10px;
		}

		.strong_text {
			color: #FF2B5B;
		}
	}

	.booked_list {
		.booked_list_item {
			.title {
				font-size: 14px;
				font-weight: 600;
				color: #24252C;
				margin-left: 10px;
			}
		}
	}

	.book_button_view {
		background-color: white;
		padding: 10px;
		padding-bottom: 44px;
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;

		.book_button {
			background: #FC6294;
			border-radius: 10px;
			border: none;
			color: white;
		}
	}
</style>
