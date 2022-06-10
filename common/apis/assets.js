import {
	request
} from '@/common/http/index.js';



export const getAssets = () => {
	return request('/api/asset/type', {}).then(res => {
		return res;
	})
}

export const getAssetsByType = (type) => {
	return request(`/api/asset/type/${type}`, {}, 'GET').then(res => {
		return res;
	})
}
