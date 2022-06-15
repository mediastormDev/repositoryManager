import {
	request
} from '@/common/http/index.js';



export const addFav = (assetId) => {
	return request('/api/fav/add', {
		assetId
	}, 'POST').then(res => {
		return res;
	})
}


export const removeFav = (assetId) => {
	return request('/api/fav/remove', {
		assetId
	}, 'POST').then(res => {
		return res;
	})
}
