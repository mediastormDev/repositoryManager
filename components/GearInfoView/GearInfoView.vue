<template>
	<view class="drawer_header">
		<img class="drawer_img" :src="gear.image" alt="gear_img" :class="{drawer_img_small: imageSize=='small'}">
		<view class="drawer_content">
			<view class="gear_name">{{gear.name}}</view>
			<view class="gear_remark">{{gear.remark}}</view>
			<view class="gear_others">
				<view class="gear_tag gear_status_tag"
					:class="{free: gear.status === GearStatus.free, booked: gear.status == GearStatus.booked, lend: gear.status == GearStatus.lend}">
					<view>{{GearStatusString[gear.status]}}</view>
				</view>
				<view class="gear_tag">{{gear.barcode}}</view>
				<view class="gear_tag">{{gear.type}}</view>
			</view>
		</view>
	</view>
</template>

<script setup lang="ts">
	import {
		onMounted
	} from 'vue';
	import {
		Gear,
		GearStatus,
		GearStatusString
	} from '@/composables/UseGear';
	const props = defineProps < {
		gear: Gear,
		imageSize: String
	} > ()


	onMounted(() => {
		console.log(props.gear);
	})
</script>

<style lang="less">
	.drawer_header {
		display: flex;
		align-items: center;

		.drawer_content {
			display: flex;
			flex-direction: column;
			margin-left: 10px;

			.gear_name {
				font-size: 16px;
				font-weight: 600;
				color: #24252C;
			}

			.gear_remark {
				font-size: 12px;
				font-weight: 400;
				color: #646464;
				margin-top: 7px;
			}

			.gear_others {
				display: flex;
				align-items: center;
				margin-top: 7px;

				>.gear_tag+.gear_tag {
					margin-left: 3px;
				}

				.gear_status_tag {
					// background-color: #ffe8ea !important;
					// color: #FF1C30 !important;

					&.free {
						color: #41D9AD;
						background-color: #ecfbf6;
					}

					&.booked {
						color: #FFAF00;
						background-color: #fff7e5;
					}

					&.lend {
						color: #FF1C30;
						background-color: #ffe8ea;
					}
				}

				.gear_tag {
					padding: 1px 5px;
					font-size: 11px;
					border-radius: 4px;
					background-color: #F4F6F7;
					color: #646464;
				}
			}
		}

		.drawer_img {
			width: 100px;
			height: 100px;
			background: #FFFFFF;
			border: 1px solid #EEEEEE;
		}

		.drawer_img_small {
			width: 60px;
			height: 60px;
			background: #FFFFFF;
			border: 1px solid #EEEEEE;
		}
	}
</style>
