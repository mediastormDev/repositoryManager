import {
	ref,
	computed
} from 'vue';

const token = ref('');
const openId = ref('');

export default () => {
	const adminTokenList = ['ou_59fc5918c2fdf9106f0cc6ada7d0db1a', 'ou_359431987ea6685b51b7cb4b1a5cbd63'];

	const isAdmin = computed(() => {
		console.log('isAdmin', !!adminTokenList.filter((admin) => admin == openId.value).length)
		console.log('openId.value', openId.value);
		return true;
		// return !!adminTokenList.filter((admin) => admin == openId.value).length;
	})

	return {
		isAdmin,
		token,
		openId
	}
}
