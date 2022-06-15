<template>
	<AdminBorrowItem v-for="borrow in borrowList" :loadData="loadData" :ticketInfo="borrow" :borrowItem="borrow.asset"
		:ticketid="borrow._id" />
</template>

<script setup lang="ts">
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
		borrowListByType('PENDING').then(res => {
			borrowList.value = res;
			console.log("borrowList", borrowList.value);
			uni.stopPullDownRefresh();
		})
	}

	onMounted(() => {
		loadData();
	})

	defineExpose({
		loadData
	})
</script>

<style>

</style>
