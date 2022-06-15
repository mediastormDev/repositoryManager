<template>
	<view>
		<view style="margin-top: 10px;" v-for="borrow in borrowList" :key="borrow._id">
			<MyReturnItemView :returnItem="borrow" />
		</view>
	</view>
</template>

<script setup lang="ts">
	import {
		ref,
		onMounted
	} from 'vue';
	import MyReturnItemView from '../MyReturnItem/MyReturnItem.vue';
	import {
		borrowListByType
	} from '@/common/apis/borrow.js';
	import UseToken from '@/composables/UseToken.js';

	const {
		openId
	} = UseToken();

	const borrowList = ref([]);

	const loadData = () => {
		console.log('openId', openId.value)
		borrowListByType('INUSE', openId.value).then(res => {
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

<style lang="less">

</style>
