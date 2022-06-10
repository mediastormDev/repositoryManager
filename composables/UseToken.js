import {
	ref
} from 'vue';

const token = ref('');

export default () => {
	return {
		token,
	}
}
