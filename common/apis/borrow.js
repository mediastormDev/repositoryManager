import {
	request
} from '@/common/http/index.js';



export const previewTicket = (barcode) => {
	return request(`/api/borrow/barcode/${barcode}`, {}).then(res => {
		return res;
	})
}

export const lendGear = (borrowId) => {
	return request(`/api/borrow/lend/${borrowId}`, {}, 'POST').then(res => {
		return res;
	})
}

export const returnGear = (borrowId) => {
	return request(`/api/borrow/return/${borrowId}`, {}, 'POST').then(res => {
		return res;
	})
}

/**
 * 
 * @param {*} type PENDING || INUSE
 */
export const borrowListByType = (type, openId = '') => {
	const data = {
		type,
	}
	if (openId) {
		data.openId = openId;
	}
	return request(`/api/borrow/list`, data).then(res => {
		return res;
	})
}


/**
 * 直接借出
 * @param {} param0 
 */
export const adminBorrow = ({
	barcodes,
	openId,
	pendingLentAt,
	pendingReturnAt
}) => {
	return request(`/api/borrow`, {
		barcodes,
		openId,
		pendingLentAt,
		pendingReturnAt
	}, 'POST').then(res => {
		return res;
	})
}
