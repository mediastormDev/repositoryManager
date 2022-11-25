<template>
	<AdminReturnItemView v-for="borrow in borrowList" :loadData="loadData" :key="borrow._id"
		:borrowItems="borrow && borrow.borrows" />
</template>

<script setup lang="ts">
	import {
		ref,
		onMounted
	} from 'vue';
	import AdminReturnItemView from '@/components/AdminReturnItem/AdminReturnItem.vue';
	import {
		borrowListByType
	} from '@/common/apis/borrow.js';
	import {
		getTicketsAll
	} from '@/common/apis/ticket.js';
	import UseToken from '@/composables/UseToken.js';

	const {
		openId
	} = UseToken();

	const borrowList = ref([]);

	const loadData = () => {
		console.log('openId', openId.value)
		// borrowListByType('INUSE').then(res => {
		// 	borrowList.value = res;
		// 	console.log("borrowList", borrowList.value);
		// 	uni.stopPullDownRefresh();
		// })

		getTicketsAll().then(res => {
			borrowList.value = res.filter(item => {
				return item.borrows.filter(borrow => borrow.asset.status == "INUSE").length
			});
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

<style lang="less">

</style>
