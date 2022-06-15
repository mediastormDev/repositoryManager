import {
	request
} from '@/common/http/index.js';



export const getAssets = () => {
	return request('/api/asset/type', {}).then(res => {
		return res;
	})
}

export const getAssetsByType = (type, pendingLentAt, pendingReturnAt) => {
	if (pendingLentAt && pendingReturnAt) {
		return request(`/api/asset/type/${type}`, {
			pendingLentAt,
			pendingReturnAt
		}, 'GET').then(res => {
			return res;
		})
	} else {
		return request(`/api/asset/type/${type}`, {}, 'GET').then(res => {
			return res;
		})
	}

}

export const getFav = (pendingLentAt, pendingReturnAt) => {
	let data = {}
	if (pendingLentAt && pendingReturnAt) {
		data.pendingLentAt = pendingLentAt;
		data.pendingReturnAt = pendingReturnAt;
	}
	return request(`/api/asset/type/fav`, data, 'GET').then(res => {
		return res;
	})
}
