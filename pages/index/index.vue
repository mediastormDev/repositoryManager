<template>
	<view class="content">
		<GearListView />
		<GearItemList style="flex:1;" />
	</view>
</template>

<script setup lang="ts">
	import {
		onMounted,
		ref
	} from 'vue';
	import GearListView from '../../components/TypeListView/TypeListView.vue';
	import GearItemList from '../../components/GearItemList/GearItemList.vue';
	import {
		getMyprofile,
		login
	} from '@/common/apis/login.js';
	import UseGear from '@/composables/UseGear.ts';

	const {
		getAssetList
	} = UseGear();

	const title = ref("设备库")

	onMounted(() => {
		uni.login({
			complete: (res) => {
				console.log('login res', res);
				login(res.code).then(() => {
					getAssetList().then(res => {
						console.log('res', res);
					});
					getMyprofile();
				});
			}
		})
	})
</script>

<style>
	.content {
		display: flex;
		flex: 1;
		height: 100vh;
	}
</style>
