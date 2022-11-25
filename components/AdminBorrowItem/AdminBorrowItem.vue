<template>
	<view class="my_return_item">
		<view class="admin_return_view">
			<OrderItem :info="borrowItems[0]" bgColor="white" />
			<switch style="transform:scale(0.7)" @change="switch2Change" />
		</view>
		<button size="mini" class="return_btn" @click="onClickBorrowAll">一键借出</button>
		<view v-show="showListStatus" class="top_view" v-for="borrow in borrowItems" :key="borrow._id">
			<GearInfoView :gear="borrow.asset" imageSize="mini" />
			<view v-if="borrow.asset.status !== 'INUSE'" style="text-align: right;"><button size="mini"
					class="return_btn" @click="onClickBorrow(borrow._id)">借出</button>
			</view>
		</view>
	</view>
</template>

<script setup lang="ts">
	import {
		ref,
		inject,
		onMounted
	} from 'vue';
	import GearInfoView from '../GearInfoView/GearInfoView.vue';
	import OrderItem from '../OrderItem/OrderItem.vue';
	import {
		lendGear,
	} from '@/common/apis/borrow.js';
	import {
		debounce
	} from 'lodash';

	const props = defineProps < {
		borrowItems: any[],
		loadData: Function
	} > ()

	const showListStatus = ref(false);

	const switch2Change = (e) => {
		showListStatus.value = e.detail.value
	}

	const onClickBorrow = debounce((ticketid) => {
		uni.showLoading({
			title: '请稍候..'
		})
		lendGear(ticketid).then(res => {
			uni.hideLoading()
			uni.showToast({
				title: "已借出"
			})
			props.loadData();
		})
	}, 100)

	const onClickBorrowAll = debounce(async () => {
		uni.showLoading({
			title: '请稍候..'
		})
		let failList = [];
		for (let item of props.borrowItems) {
			try {
				await lendGear(item._id)
			} catch (e) {
				failList.push(item)
			}
		}
		if (failList.length) {
			uni.showModal({
				title: "提示",
				content: `有${failList.length}件借出失败，请手动借出`,
			})
		}
		props.loadData();

	}, 100)

	onMounted(() => {
		console.log("admin item mounted", props.borrowItems);
	})
</script>

<style lang="less">
	.my_return_item {
		background-color: white;
		padding: 10px;
		margin-top: 10px;

		.admin_return_view {
			display: flex;
			align-items: center;
			justify-content: space-between;
		}

		.top_view {
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin-top: 10px;
		}

		.return_btn {
			background: #8D87B6;
			border-radius: 10px;
			color: #FFFFFF;
			border: none;
			padding: 6px 16px;
		}
	}
</style>
