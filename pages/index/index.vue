<template>
	<view class="content">
		<GearFilters></GearFilters>
		<view class="body">
			<GearListView style="width: 77px" />
			<GearItemList style="flex:1;" />
		</view>
		<view v-show="selectedGears.length" class="button_view">
			<button class="coll_button">收藏</button>
			<button @click.stop="toBook" class="book_button">预约</button>
		</view>
	</view>
</template>

<script setup lang="ts">
	import {
		computed,
		onMounted,
		ref
	} from 'vue';
	import GearListView from '../../components/TypeListView/TypeListView.vue';
	import GearItemList from '../../components/GearItemList/GearItemList.vue';
	import GearFilters from '../../components/GearFilter/GearFilter.vue';
	import {
		getMyprofile,
		login
	} from '@/common/apis/login.js';
	import {
		debounce
	} from 'lodash';
	import UseGear from '@/composables/UseGear.ts';
	import UseSelectList from '@/composables/UseSelectList.js';


	const {
		nowGearList,
		getAssetList
	} = UseGear();
	const {
		selectedGears
	} = UseSelectList();

	const title = ref("设备库");


	const toBook = debounce(() => {
		uni.setStorage({
			data: selectedGears.value,
			key: 'selectedGears',
			success: () => {
				uni.navigateTo({
					url: '/pages/BookGears/BookGears'
				})
			}
		})
	}, 100)

	onMounted(() => {
		uni.login({
			complete: (res) => {
				console.log('login complete', res);
			},
			success: (res) => {
				console.log('login success', res);
				login(res.code).then(() => {
					getAssetList().then(res => {
						console.log('res444', res);
					});
					
					getMyprofile();
				});
			},
			fail: (error) => {
				console.error("login error", error)
			}
		})
	})
</script>

<style lang="less">
	.content {
		display: flex;
		flex-direction: column;
		flex: 1;
		height: 100vh;

		.body {
			display: flex;
			flex: 1;
		}
	}

	.button_view {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		display: flex;
		padding: 10px;
		background-color: white;

		.coll_button {
			border-radius: 10px;
			border: 1px solid #EEEEEE;
			color: #646464;
			background-color: white;
			display: flex;
			flex: 1;
			align-items: center;
			justify-content: center;
			text-align: center;

			margin-right: 6px;
		}

		.book_button {
			border-radius: 10px;
			border: none;
			color: white;
			background: #FC6294;
			display: flex;
			flex: 1;
			align-items: center;
			justify-content: center;
			text-align: center;
		}
	}
</style>
