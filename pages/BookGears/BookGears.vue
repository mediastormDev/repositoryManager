<template>
	<view class="gear_list_view">
		<view class="gear_list_item" v-for="(gear,index) in gearList" :key="gear._id">
			<GearInfoView :gear="gear" />
			<image @click="removeGearByClick(gear, index)" v-if="gearList.length !== 1" src="../../static/close.png"
				style="width: 20px;height: 20px;" mode=""></image>
		</view>
	</view>
	<view style="margin-top: 20px;">
		<view v-if="isAdmin" class="select_view">
			<view class="title">使用者</view>
			<view class="input_view" @click="selectUser">
				<view v-if="adminChooseUser">{{adminChooseUser.openId}}</view>
				<view v-else class="default_text">请选择</view>
				<image src="../../static/enter.png" style="width: 20px;height: 20px;" mode=""></image>
			</view>
		</view>
		<view class="select_view">
			<view class="title">开始时间</view>
			<view class="input_view" @click="selectStartTime">
				<view v-if="startDate">{{startDate && dayjs(startDate).format('MM月DD日 HH:mm')}}</view>
				<view v-else class="default_text">请选择</view>
				<image src="../../static/enter.png" style="width: 20px;height: 20px;" mode=""></image>
			</view>
		</view>
		<view class="select_view">
			<view class="title">结束时间</view>
			<view class="input_view" @click="selectEndTime">
				<view v-if="endDate">{{ endDate && dayjs(endDate).format('MM月DD日 HH:mm')}}</view>
				<view v-else class="default_text">请选择</view>
				<image src="../../static/enter.png" style="width: 20px;height: 20px;" mode=""></image>
			</view>
		</view>
		<view class="select_view">
			<view class="title">持续时间</view>
			<view class="input_view">
				<view v-if="startDate && endDate && !disableBtn">{{timeDiff}}</view>
				<view v-else class="default_text">选择起止时间后计算</view>
				<image src="../../static/enter.png" style="width: 20px;height: 20px;" mode=""></image>
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
	<view style="height: 200px;"></view>
	<view class="book_button_view">
		<button class="book_button" v-if="ticketInfo && ticketInfo._id" @click="cancelBook">取消预约</button>
		<button v-if="!isAdmin" class="book_button" :disabled="disableBtn" @click="pressBook">{{ticketInfo?'修改':'立即'}}预约</button>
		<button v-if="isAdmin" class="book_button" :disabled="disableBtn" @click="pressBookAdmin">立即借出</button>
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
		cancelTicket,
		previewTicket,
		createTicket,
		updateTickeDate,
		removeGear
	} from '@/common/apis/ticket.js';
	import {
		adminBorrow
	} from '@/common/apis/borrow.js';
	import UseToken from '../../composables/UseToken.js';

	const {
		isAdmin,
		openId
	} = UseToken();

	const adminChooseUser = ref();
	const datePickerRef = ref(null);
	const startDate = ref('');
	const endDate = ref('');
	const gearList = ref([]);
	const bookInfo = ref([]);
	const ticketInfo = ref();
	const disableBtn = ref(false);

	const timeDiff = computed(() => {
		return timeDifference(startDate.value, endDate.value)
	})

	let selectDateType = 0;

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

	const selectUser = debounce(() => {
		tt.chooseContact({
			multi: false,
			ignore: false,
			maxNum: 1,
			limitTips: "选择人数达到上限了",
			enableChooseDepartment: true,
			success(res) {
				console.log(JSON.stringify(res));
				adminChooseUser.value = res.data[0];
			},
			fail(res) {
				console.log(`chooseContact fail: ${JSON.stringify(res)}`);
			}
		});
	}, 100)

	const selectStartTime = () => {
		console.log('click show picker')
		selectDateType = 0;
		datePickerRef.value && datePickerRef.value.openPicker(startDate.value);
	}

	const selectEndTime = () => {
		selectDateType = 1;
		datePickerRef.value && datePickerRef.value.openPicker(endDate.value);
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

	const removeGearByClick = (gear, index) => {
		console.log('gear', gear);
		if (ticketInfo.value) {
			removeGear(ticketInfo.value._id, gear.borrowId).then(res => {
				gearList.value.splice(index, 1)
			})
		} else {
			gearList.value.splice(index, 1)
		}
	}

	const previewIfBooked = () => {
		const barcodes = gearList.value.map(item => {
			item.booked = false;
			return item.barcode;
		});
		if (ticketInfo.value && ticketInfo.value._id) {
			previewTicket(barcodes, startDate.value, endDate.value, ticketInfo.value._id).then(res => {
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
		} else {
			previewTicket(barcodes, startDate.value, endDate.value, '').then(res => {
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

	}

	const pressBookAdmin = debounce(() => {
		if (!startDate.value || !endDate.value) {
			uni.showToast({
				title: '未选择时间'
			})
			return;
		}
		if (!adminChooseUser.value) {
			uni.showToast({
				title: '未选择领用人'
			})
			return;
		}
		const barcodes = gearList.value.filter(item => !item.booked).map(item => item.barcode);
		console.log('barcodes', barcodes);
		console.log('startDate', startDate.value);
		console.log('endDate', endDate.value);
		adminBorrow({
			barcodes,
			openId: adminChooseUser.value.openId,
			pendingLentAt: startDate.value,
			pendingReturnAt: endDate.value
		}).then(res => {
			uni.showToast({
				title: '预定成功'
			})
			uni.navigateBack({

			})
		})
	}, 100)

	const pressBook = debounce(() => {
		const barcodes = gearList.value.filter(item => !item.booked).map(item => item.barcode);
		if (barcodes.length) {
			if (ticketInfo.value && ticketInfo.value._id) {
				updateTickeDate(ticketInfo.value._id, startDate.value, endDate.value).then(res => {
					uni.showToast({
						title: '预定成功'
					})
					uni.navigateBack({

					})
				})

			} else {
				createTicket(barcodes, startDate.value, endDate.value).then(res => {
					console.log('createTicket', res);
					uni.showToast({
						title: '预定成功'
					})
					uni.navigateBack({

					})
				})
			}

		} else {
			uni.showToast({
				title: '时段有冲突',
				icon: 'error'
			})
		}
	}, 100)

	const cancelBook = debounce(() => {
		cancelTicket(ticketInfo.value._id).then(res => {
			uni.navigateBack({

			})
		})
	}, 100)

	onMounted(() => {
		const orderInfo = uni.getStorageSync('orderInfo');
		const orderInfoMore = uni.getStorageSync('orderInfoMore');
		console.log('orderInfo', orderInfo)
		console.log('orderInfoMore', orderInfoMore)
		if (orderInfo) {
			gearList.value = orderInfo.borrows.map(item => {
				item.asset.borrowId = item._id;
				return item.asset;
			});
			startDate.value = orderInfo.pendingLentAt;
			endDate.value = orderInfo.pendingReturnAt;
			ticketInfo.value = orderInfo;
			uni.removeStorageSync('orderInfo');
		} else if (orderInfoMore) {
			gearList.value = orderInfoMore.borrows.map(item => item.asset);
			startDate.value = orderInfoMore.pendingLentAt;
			endDate.value = orderInfoMore.pendingReturnAt;
			ticketInfo.value = orderInfoMore;
			ticketInfo.value._id = '';
			uni.removeStorageSync('orderInfoMore');
		} else {
			uni.getStorage({
				key: 'selectedGears',
				success: (res) => {
					gearList.value = res.data;
					console.log('selectedGears', gearList.value)
					uni.removeStorageSync('selectedGears');
				}
			})
		}
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
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		display: flex;
		align-items: center;

		>button {
			flex: 1;
		}

		.book_button {
			background: #FC6294;
			border-radius: 10px;
			border: none;
			color: white;
		}
	}
</style>
