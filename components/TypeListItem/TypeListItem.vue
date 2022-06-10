<template>
	<view v-if="typeItem" @click="onTypeClick" class="type_item" :class="{select: typeItem.selected}">
		{{typeItem.name}}
	</view>
</template>

<script setup lang="ts">
	const props = defineProps < {
		typeItem: any,
		index: number
	} > ();
	
	const emit = defineEmits(['selectItem'])

	const onTypeClick = () => {
		emit('selectItem', props.index);
		console.log('onTypeClick')
	}
</script>

<style lang="less">
	.type_item {
		font-size: 12px;
		font-weight: 400;
		color: #24252C;
		padding: 22px 20px;
		text-align: center;

		&.select {
			color: #FF2B5B;
			background-color: white;
		}
	}
</style>
