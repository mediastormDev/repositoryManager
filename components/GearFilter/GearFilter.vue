<template>
	<view class="filter_view">
		<image @click="removeAll" v-show="selectedGears.length" style="width: 30px;height: 30px;"
			src="../../static/close.png" mode="">
		</image>
		<view>
			<view class="select_text" v-show="selectedGears.length">已选中{{selectedGears.length}}项</view>
		</view>
		<image @click="showFilter" style="width: 30px;height: 30px;"
			:src="startDate && endDate?'../../static/filter_select.png':'../../static/filter.png'" mode=""></image>
	</view>
	<DrawderView ref="filterDrawerRef">
		<view>
			<view>筛选时间</view>
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
			<view class="date_btn_view">
				<button @click="closePicker">清空</button>
				<button @click="over">完成</button>
			</view>
		</view>
	</DrawderView>
	<DatePickerView2 @onConfirm="onDatePickerConfirm" ref="datePickerRef"></DatePickerView2>
</template>

<script setup lang="ts">
	import {
		ref,
		computed
	} from 'vue';
	import DrawderView from '../Drawder/Drawder.vue';
	import dayjs from 'dayjs';
	import DatePickerView2 from '@/components/DatePickerView/DatePickerView.vue';
	import UseGear, {
		GearStatus,
		Gear
	} from '../../composables/UseGear.ts';
	import {
		debounce
	} from 'lodash';
	import UseSelectList from '@/composables/UseSelectList.js';


	const {
		nowType,
		getMyAssetByType,
		nowGearList,
		getMyFavList
	} = UseGear();

	const {
		selectedGears,
		removeItems
	} = UseSelectList();


	const filterDrawerRef = ref(null);
	const datePickerRef = ref(null);
	const startDate = ref();
	const endDate = ref();
	const disableBtn = ref(false);
	let selectDateType = 0;

	const showFilter = () => {
		filterDrawerRef.value.openDrawer();
	}

	const removeAll = () => {
		removeItems(nowGearList.value);
	}

	const closePicker = debounce(() => {
		startDate.value = null;
		endDate.value = null;
		if (nowType.value == '收藏') {
			getMyFavList().then(res => {
				console.log('fav', res);
				filterDrawerRef.value.closeDrawer();
			})
		} else {
			getMyAssetByType(nowType.value).then(() => {
				filterDrawerRef.value.closeDrawer();
			})
		}

	}, 100)

	const over = debounce(() => {
		if (startDate.value && endDate.value) {
			if (nowType.value == '收藏') {
				getMyFavList(dayjs(startDate.value).format(), dayjs(endDate.value).format()).then(res => {
					console.log('fav', res);
					filterDrawerRef.value.closeDrawer();
				})
			} else {
				getMyAssetByType(nowType.value, dayjs(startDate.value).format(), dayjs(endDate.value).format())
					.then(
						res => {
							filterDrawerRef.value.closeDrawer();
						})
			}

		}

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

	const previewIfBooked = () => {

	}
</script>

<style lang="less" scoped>
	.filter_view {
		z-index: 3;
		background-color: white;
		padding: 10px;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.select_text {
		font-size: 16px;
		font-weight: 600;
		color: #24252C;
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

	.chooseColor {
		color: #ff8389;
	}

	.date_btn_view {
		display: flex;
		align-items: center;

		>button {
			flex: 1;
		}
	}
</style>
