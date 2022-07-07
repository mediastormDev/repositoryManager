<template>
	<!-- <AdminBorrowItem v-for="borrow in borrowList" :loadData="loadData" :ticketInfo="borrow" :borrowItem="borrow.asset"
		:ticketid="borrow._id" /> -->
	<AdminBorrowItem v-for="borrow in borrowList" :loadData="loadData" :key="borrow._id"
		:borrowItems="borrow && borrow.borrows" />
</template>

<script setup lang="ts">
	import {
		onPullDownRefresh,
		onShow
	} from "@dcloudio/uni-app";
	import {
		ref,
		onMounted
	} from 'vue';
	import {
		getTicketsAll
	} from '@/common/apis/ticket.js';
	import {
		borrowListByType
	} from '@/common/apis/borrow.js';
	import AdminBorrowItem from '@/components/AdminBorrowItem/AdminBorrowItem.vue';


	const borrowList = ref([]);

	const loadData = () => {
		// borrowListByType('PENDING').then(res => {
		// 	borrowList.value = res;
		// 	console.log("borrowList", borrowList.value);
		// 	uni.stopPullDownRefresh();
		// })

		getTicketsAll().then(res => {
			borrowList.value = res.filter(item => {
				return item.borrows.filter(borrow => borrow.asset.status == "PENDING").length
			});
			console.log("borrowList", borrowList.value);
			uni.stopPullDownRefresh();
		})
	}

	onMounted(() => {
		loadData();
	})

	onShow(() => {
		loadData();
	})

	defineExpose({
		loadData
	})
</script>

<style>

</style>
