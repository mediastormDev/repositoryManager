<template>
	<view class="my_return_item">
		<view class="admin_return_view">
			<OrderItem :info="borrowItems[0]" bgColor="white" />
			<switch style="transform:scale(0.7)" @change="switch2Change" />
		</view>
		<button size="mini" class="return_btn" @click="onClickReturnAll">一键归还</button>
		<view v-show="showListStatus" class="top_view" v-for="borrow in borrowItems" :key="borrow._id">
			<GearInfoView :gear="borrow.asset" imageSize="mini" />
			<view v-if="borrow.asset.status == 'INUSE'" style="text-align: right;"><button size="mini"
					class="return_btn" @click="onClickReturn(borrow._id)">归还</button>
			</view>
		</view>
	</view>
</template>

<script setup lang="ts">
	import {
		ref
	} from 'vue';
	import GearInfoView from '../GearInfoView/GearInfoView.vue';
	import OrderItem from '../OrderItem/OrderItem.vue';
	import {
		returnGear
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


	const onClickReturn = (ticketid) => {
		uni.showLoading({
			title: '请稍候..'
		})
		returnGear(ticketid).then(() => {
			uni.hideLoading()
			uni.showToast({
				title: "已归还"
			})
			props.loadData();
		});
	}

	const onClickReturnAll = debounce(async () => {
		uni.showLoading({
			title: '请稍候..'
		})
		let failList = [];
		for (let item of props.borrowItems) {
			try {
				await returnGear(item._id)
			} catch (e) {
				failList.push(item)
			}
		}
		if (failList.length) {
			uni.showModal({
				title: "提示",
				content: `有${failList.length}件归还失败，请手动归还`,
			})
		}
		props.loadData();

	}, 100)
</script>

<style lang="less">
	.my_return_item {
		background-color: white;
		padding: 10px;
		margin-top: 10px;

		.top_view {
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin-top: 10px;
		}

		.admin_return_view {
			display: flex;
			align-items: center;
			justify-content: space-between;
		}

		.return_btn {
			background: #FFDA71;
			border-radius: 10px;
			color: #A2662A;
			border: none;
			padding: 6px 16px;
		}
	}
</style>
