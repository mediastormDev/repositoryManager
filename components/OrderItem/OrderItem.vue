<template>
	<view class="order_item_view" v-if="info" :style="{backgroundColor: bgColor}">
		<view class="name_text">{{info.nickname || ''}}</view>
		<template v-if="!hideStatus">
			<view class="content_text" v-if="info.lentAt">使用中：{{dayjs(info.lentAt).format('MM-DD HH:mm')}}</view>
			<view class="content_text" v-else>已预约：{{dayjs(info.pendingLentAt).format('MM-DD HH:mm')}} -
				{{dayjs(info.pendingReturnAt).format('MM-DD HH:mm')}}
			</view>
		</template>
		<template v-else>
			<view class="content_text">
				{{dayjs(info.pendingLentAt).format('MM-DD HH:mm')}} 至
				{{dayjs(info.pendingReturnAt).format('MM-DD HH:mm')}}
			</view>
		</template>
	</view>
</template>

<script setup lang="ts">
	import {
		ref,
		onMounted
	} from 'vue';
	import dayjs from 'dayjs';

	const props = defineProps < {
		hideStatus: Boolean,
		bgColor ? : String,
		info: any
	} > ()

	const userInfo = ref < any > ();
</script>

<style lang="less">
	.order_item_view {
		display: flex;
		align-items: center;
		background: #F4F6F7;
		padding: 6px 10px;
		// margin-top: 10px;

		.name_text {
			font-size: 13px;
			font-weight: 400;
			color: #FF2B5B;
			margin-right: 5px;
		}

		.content_text {
			font-size: 13px;
			font-weight: 400;
			color: #646464;
		}
	}
</style>
