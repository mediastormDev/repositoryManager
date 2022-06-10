<template>
	<view class="datepicker_view" v-if="show">
		<view class="date_btn_view">
			<button @click="closePicker">取消</button>
			<button @click="onConfirm">确认</button>
		</view>
		<picker-view indicator-style="height: 50px;color:black;" mask-style="z-index: 0;" style="height: 750rpx;"
			value="value" @change="bindChange">
			<picker-view-column style="text-align: center;">
				<view v-for="month in months" style="line-height: 50px; text-align: center;">{{month}}月</view>
			</picker-view-column>
			<picker-view-column style="text-align: center;">
				<view v-for="day in days" style="line-height: 50px; text-align: center;">{{day}}日</view>
			</picker-view-column>
			<picker-view-column>
				<view v-for="hour in hours" style="line-height: 50px; text-align: center;">{{hour}}时</view>
			</picker-view-column>
			<picker-view-column>
				<view v-for="min in minutes" style="line-height: 50px; text-align: center;">{{min}}分</view>
			</picker-view-column>
		</picker-view>
	</view>
</template>

<script setup lang="ts">
	import {
		onMounted,
		ref
	} from 'vue';

	const date = ref(new Date());
	const months = ref([]);
	const days = ref([]);
	const hours = ref([]);
	const minutes = ref([]);
	const value = ref();
	const result = ref();
	const show = ref(false);
	
	const emit = defineEmits(['onConfirm'])

	const bindChange = (e) => {
		const val = e.detail.value;
		value.value = val;
		console.log(val);
		const month = months.value[val[0]];
		const day = days.value[val[1]];
		const hour = hours.value[val[2]];
		const minute = minutes.value[val[3]];

		console.log(`${date.value.getFullYear()}/${month}/${day} ${hour}:${minute}:00`);
		result.value = new Date(`${date.value.getFullYear()}/${month}/${day} ${hour}:${minute}:00`).getTime();
		console.log('valuevalue', value.value)
	}
	
	const onConfirm = () => {
		emit('onConfirm', result.value);
		closePicker();
	}

	const openPicker = () => {
		show.value = true;
	}

	const closePicker = () => {
		show.value = false;
	}

	onMounted(() => {
		for (let i = 1; i <= 12; i++) {
			months.value.push(i)
		}
		for (let i = 1; i <= 31; i++) {
			days.value.push(i)
		}
		for (let i = 1; i <= 24; i++) {
			hours.value.push(i)
		}
		for (let i = 1; i <= 60; i++) {
			minutes.value.push(i)
		}
	})

	defineExpose({
		openPicker,
		closePicker,
	})
</script>

<style lang="less">
	.datepicker_view {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		background-color: white;

		.date_btn_view {
			display: flex;
			align-items: center;

			>button {
				flex: 1;
			}
		}
	}
</style>
