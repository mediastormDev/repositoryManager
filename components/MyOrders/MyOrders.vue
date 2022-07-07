<template>
	<view>
		<MyOrderItem v-for="order in orderList" :key="order._id" :orderInfo="order" />
	</view>
</template>

<script setup lang="ts">
	import {
		ref,
		onMounted
	} from 'vue';
	import {
		onShow
	} from '@dcloudio/uni-app';
	import MyOrderItem from '../MyOrderItem/MyOrderItem.vue';
	import {
		getTickets
	} from '../../common/apis/ticket.js';

	const orderList = ref < any[] > ([]);

	const loadData = () => {
		getTickets().then(res => {
			orderList.value = res;
			uni.stopPullDownRefresh()
		})
	}

	onMounted(() => {
		loadData();
	})

	defineExpose({
		loadData
	})
</script>

<style lang="less">

</style>
