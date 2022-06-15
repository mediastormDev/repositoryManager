import {
	ref,
	computed
} from 'vue';

const token = ref('');
const openId = ref('');

export default () => {
	const adminTokenList = ['ou_59fc5918c2fdf9106f0cc6ada7d0db1a'];

	const isAdmin = computed(() => {
		console.log('isAdmin', !!adminTokenList.filter((admin) => admin == openId.value).length)
		return !!adminTokenList.filter((admin) => admin == openId.value).length;
	})

	return {
		isAdmin,
		token,
		openId
	}
}
