<template>
	<scroll-view scroll-y scroll-with-animation class="scroll_view">
		<view class="grid_view">
			<!-- uni-app bug 组件化后会导致点击一次变成两次，暂时不使用组件 -->
			<view class="gear_item" v-for="gear in nowGearList" :key="gear._id" :gear="gear" @click="clickGear(gear)">
				<image class="gear_pic" src="../../static/logo.png" mode="aspectFit"></image>
				<view class="gear_title">{{gear.name}}</view>
				<view class="gear_status"
					:class="{free: gear.status == GearStatus.free, booked: gear.status == GearStatus.booked,lend: gear.status == GearStatus.lend}">
				</view>
				<icon @click.stop="selectGearItem(gear)" class="gear_icon" type="success"
					:color="gear.selected?'':'#F4F6F7'">
				</icon>
			</view>
		</view>
	</scroll-view>
	<DrawerView ref="drawerRef">
		<view v-if="selectedGear">
			<GearInfoView :gear="selectedGear" />
			<view class="order" style="margin-top: 5px;">
				<scroll-view scroll-y scroll-with-animation style="height: 100px;">
					<OrderItemView v-for="book in bookInfo" :key="book._id" :info="book" />
				</scroll-view>
			</view>
			<view class="button_view_2">
				<button @click.stop="addToMyFav" class="coll_button">{{nowType == '收藏'?'取消收藏':'收藏'}}</button>
				<button @click.stop="toBook" class="book_button">{{isAdmin?'立即借出':'预约'}}</button>
			</view>
		</view>
	</DrawerView>
</template>

<script setup lang="ts">
	import {
		ref,
		watch
	} from 'vue';
	import GearItemView from '../GearItem/GearItem.vue';
	import DrawerView from '../Drawder/Drawder.vue';
	import UseGear, {
		GearStatus,
		Gear
	} from '../../composables/UseGear.ts';
	import OrderItemView from '../OrderItem/OrderItem.vue';
	import GearInfoView from '../GearInfoView/GearInfoView.vue';
	import UseSelectList from '@/composables/UseSelectList.js';
	import {
		addFav,
		removeFav
	} from '@/common/apis/fav.js';
	import UseToken from '@/composables/UseToken.js';

	const {
		isAdmin
	} = UseToken();

	const {
		nowType,
		getBookInfo,
		nowGearList
	} = UseGear();
	const {
		selectedGears,
		addItem,
		removeItem,
	} = UseSelectList();

	const drawerRef = ref(null);
	const selectedGear = ref < any > ();
	const bookInfo = ref < any[] > ();

	watch(nowGearList, (cur) => {
		for (let i = 0; i < selectedGears.value.length; i++) {
			const added = selectedGears.value[i];
			for (let i = 0; i < cur.length; i++) {
				const newItem = cur[i];
				if (added._id == newItem._id) {
					newItem.selected = true;
				}
			}
		}
	})

	const addToMyFav = () => {
		console.log('gear', selectedGear.value);
		if (nowType.value == '收藏') {
			removeFav(selectedGear.value._id).then(() => {
				uni.showToast({
					title: '已取消'
				})
			})
		} else {
			addFav(selectedGear.value._id).then(() => {
				uni.showToast({
					title: '已收藏'
				})
			})
		}

	}

	const selectGearItem = (gear: any) => {
		gear.selected = !gear.selected;
		if (gear.selected) {
			addItem(gear);
		} else {
			removeItem(gear);
		}
	}

	const clickGear = (gear: any) => {
		console.log('gear', gear);
		console.log('barcode', gear.barcode);
		drawerRef.value.openDrawer();
		selectedGear.value = gear;
		getBookInfo(gear.barcode).then(res => {
			bookInfo.value = res;
		})
	}

	const toBook = () => {
		uni.setStorage({
			data: [selectedGear.value],
			key: 'selectedGears',
			success: () => {
				uni.navigateTo({
					url: '/pages/BookGears/BookGears'
				})
			}
		})


	}
</script>

<style lang="less" scoped>
	.scroll_view {
		height: 100vh;
		background-color: white;

		.grid_view {
			margin: 10px;
			display: grid;
			grid-template-columns: repeat(3, 1fr);
			grid-row-gap: 10px;
			grid-column-gap: 10px;

			.gear_item {
				position: relative;

				.gear_pic {
					width: 86px;
					height: 80px;
				}

				.gear_icon {
					position: absolute;
					right: 0px;
					top: 0px;
				}

				.gear_title {
					text-align: center;
					font-size: 11px;
					font-weight: 400;
					color: #24252C;
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 2;
					-webkit-box-orient: vertical;
					display: -moz-box;
					-moz-line-clamp: 2;
					-moz-box-orient: vertical;
					word-wrap: break-word;
					word-break: break-all;
					white-space: normal;
				}

				.gear_status {
					position: absolute;
					right: 5px;
					bottom: 25px;
					width: 10px;
					height: 10px;
					border-radius: 50%;
					border: 2px solid #FFFFFF;

					&.free {
						background-color: #41D9AD;
					}

					&.booked {
						background-color: #FFDA71;
					}

					&.lend {
						background-color: #FF1C30;
					}
				}
			}
		}
	}

	.button_view_2 {
		display: flex;
		margin: 10px 0;

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
