<template>
	<view class="gear_item">
		<image class="gear_pic" src="../../static/logo.png"></image>
		<view class="gear_title">{{gear.name}}</view>
		<view class="gear_status"
			:class="{free: gear.status == GearStatus.free, booked: gear.status == GearStatus.booked,lend: gear.status == GearStatus.lend}">
		</view>
		<icon @click.stop="selectGearItem" class="gear_icon" type="success" :color="gear.selected?'':'#F4F6F7'"></icon>
	</view>
</template>

<script setup lang="ts">
	const props = defineProps < {
		gear: any,
	} > ()

	enum GearStatus {
		free,
		booked,
		lend,
	}

	// const emit = defineEmits(['clickGearItem'])

	const selectGearItem = () => {
		// emit('clickGearItem', props.index);
		props.gear.selected = !props.gear.selected;
		console.log('props.gear', props.gear)
	}
</script>

<style lang="less">
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
</style>
