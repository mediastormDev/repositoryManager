<template>
	<view class="gear_list">
		<scroll-view scroll-y scroll-with-animation class="scroll_view">
			<TypeListItem @selectItem="onSelectItem" v-for="(type,index) in typeList" :key="index" :typeItem="type"
				:index="index" />
		</scroll-view>
	</view>

</template>

<script setup lang="ts">
	import {
		ref,
		watch
	} from 'vue';
	import TypeListItem from '../TypeListItem/TypeListItem.vue';
	import UseGear from '@/composables/UseGear.ts';

	const {
		nowGearList,
		gearList,
		getMyAssetByType
	} = UseGear();

	type TypeItem = {
		name: String;
		selected: Boolean;
	}

	const typeList = ref < TypeItem[] > ([]);

	watch(gearList, (cur) => {
		console.log('cur', cur);
		typeList.value = cur;
	})
	
	const loadAssetByType = (type) => {
		getMyAssetByType(type).then(res => {
			console.log('某类型的资产', res);
		})
	}

	const onSelectItem = (index: number) => {
		typeList.value.map((item, i) => {
			if (i === index) {
				item.selected = true;
				loadAssetByType(item.name);
			} else {
				item.selected = false;
			}
			return item;
		});
	}
</script>

<style lang="less">
	.gear_list {
		height: 100%;

		.scroll_view {
			height: 100%;
			background-color: #F4F6F7;
		}
	}
</style>
